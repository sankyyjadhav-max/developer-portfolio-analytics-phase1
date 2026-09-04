import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export async function getPortfolio(req: Request, res: Response) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: {
        userId: req.userId!,
      },
      include: {
        projects: {
          orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' },
          ],
        },
      },
    });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found',
      });
    }

    return res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Unable to fetch portfolio',
    });
  }
}

export async function createPortfolio(req: Request, res: Response) {
  try {
    const existing = await prisma.portfolio.findUnique({
      where: {
        userId: req.userId!,
      },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Portfolio already exists',
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId: req.userId!,
        slug: req.body.slug || `portfolio-${Date.now()}`,
        fullName: req.body.fullName || null,
        title: req.body.title || null,
        profileImage: req.body.profileImage || null,
        location: req.body.location || null,
        email: req.body.email || null,
        phone: req.body.phone || null,
        introduction: req.body.introduction || null,
        about: req.body.about || null,
        skills: req.body.skills || [],
        experience: req.body.experience || [],
        education: req.body.education || [],
        socialLinks: req.body.socialLinks || {},
        template: req.body.template || 'minimal',
        accent: req.body.accent || 'neutral',
        darkMode: req.body.darkMode || false,
      },
      include: {
        projects: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || 'Unable to create portfolio',
    });
  }
}

export async function updatePortfolio(req: Request, res: Response) {
  try {
    const {
      slug,
      fullName,
      title,
      profileImage,
      location,
      email,
      phone,
      introduction,
      about,
      skills,
      experience,
      education,
      socialLinks,
      template,
      accent,
      darkMode,
    } = req.body;

    const portfolio = await prisma.portfolio.update({
      where: {
        userId: req.userId!,
      },
      data: {
        slug,
        fullName,
        title,
        profileImage,
        location,
        email,
        phone,
        introduction,
        about,
        skills,
        experience,
        education,
        socialLinks,
        template,
        accent,
        darkMode,
      },
      include: {
        projects: {
          orderBy: [
            { featured: "desc" },
            { createdAt: "desc" },
          ],
        },
      },
    });

    return res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Unable to update portfolio",
    });
  }
}

export async function publish(req: Request, res: Response) {
  try {
    const portfolio = await prisma.portfolio.update({
      where: {
        userId: req.userId!,
      },
      data: {
        published: true,
      },
    });

    return res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || 'Unable to publish portfolio',
    });
  }
}

export async function unpublish(req: Request, res: Response) {
  try {
    const portfolio = await prisma.portfolio.update({
      where: {
        userId: req.userId!,
      },
      data: {
        published: false,
      },
    });

    return res.json({
      success: true,
      data: portfolio,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || 'Unable to unpublish portfolio',
    });
  }
}

export async function publicPortfolio(req: Request, res: Response) {
  const slug = String(req.params.slug);

  const portfolio = await prisma.portfolio.findFirst({
    where: {
      slug,
      published: true,
    },
    include: {
      projects: {
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' },
        ],
      },
    },
  });

  if (!portfolio) {
    return res.status(404).json({
      success: false,
      message: 'Portfolio not found',
    });
  }

  return res.json({
    success: true,
    data: portfolio,
  });
}