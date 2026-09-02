import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional().nullable(),
  technologies: z.array(z.string()).optional(),
  githubUrl: z.string().optional().nullable(),
  liveDemoUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
});

async function owned(id: string, userId: string) {
  return prisma.project.findFirst({
    where: {
      id,
      portfolio: {
        userId,
      },
    },
  });
}

export async function list(req: Request, res: Response) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        userId: req.userId!,
      },
    });

    if (!portfolio) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        portfolioId: portfolio.id,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Unable to fetch projects',
    });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const data = schema.parse(req.body);

    const portfolio = await prisma.portfolio.findUnique({
      where: {
        userId: req.userId!,
      },
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    const project = await prisma.project.create({
      data: {
        portfolioId: portfolio.id,
        title: data.title,
        description: data.description,
        image: data.image ?? null,
        technologies: data.technologies ?? [],
        githubUrl: data.githubUrl ?? null,
        liveDemoUrl: data.liveDemoUrl ?? null,
        featured: data.featured ?? false,
      },
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error?.issues?.[0]?.message || 'Invalid project data',
    });
  }
}

export async function get(req: Request, res: Response) {
  const id = String(req.params.id);

  const project = await owned(id, req.userId!);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found',
    });
  }

  return res.json({
    success: true,
    data: project,
  });
}

export async function update(req: Request, res: Response) {
  try {
    const data = schema.parse(req.body);
    const id = String(req.params.id);

    const project = await owned(id, req.userId!);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    const updated = await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image ?? null,
        technologies: data.technologies ?? [],
        githubUrl: data.githubUrl ?? null,
        liveDemoUrl: data.liveDemoUrl ?? null,
        featured: data.featured ?? false,
      },
    });

    return res.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error?.issues?.[0]?.message || 'Invalid project data',
    });
  }
}

export async function remove(req: Request, res: Response) {
  const id = String(req.params.id);

  const project = await owned(id, req.userId!);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found',
    });
  }

  await prisma.project.delete({
    where: {
      id: project.id,
    },
  });

  return res.json({
    success: true,
    message: 'Project deleted',
  });
}