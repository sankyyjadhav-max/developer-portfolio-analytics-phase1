import {Request,Response,NextFunction} from 'express'; import {verifyToken} from '../utils/jwt';
declare global { namespace Express { interface Request { userId?: string } } }
export function auth(req:Request,res:Response,next:NextFunction){ const token=req.cookies?.token; if(!token)return res.status(401).json({success:false,message:'Authentication required'}); try{req.userId=verifyToken(token).userId; next();}catch{return res.status(401).json({success:false,message:'Session expired or invalid'})} }
