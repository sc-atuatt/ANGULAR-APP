import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.SECRET as string;

export interface ExtendedRequest extends Request {
  decodedToken?: string | JwtPayload
}

const userAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization as string;
    console.log(bearerToken);
    
    const token = bearerToken.split(' ')[1];
    console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    
    console.log(token);
    
    const decodedToken = jwt.verify(token, "SomeRandomText");
    (req as ExtendedRequest).decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({message: 'Unauthorizeddddddddd access'});
  }
}

export default userAuth;