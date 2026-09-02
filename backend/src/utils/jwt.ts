import jwt from 'jsonwebtoken';
const secret=()=>process.env.JWT_SECRET||'development-secret-change-me';
export const signToken=(userId:string)=>jwt.sign({userId},secret(),{expiresIn:'7d'});
export const verifyToken=(token:string)=>jwt.verify(token,secret()) as {userId:string};