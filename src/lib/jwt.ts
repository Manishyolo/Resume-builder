import { JWTPayload } from "@/types/user.types";
import jwt from "jsonwebtoken";

export const genrateToken = (payload:JWTPayload):string=>{
    return jwt.sign(payload,process.env.JWT_SECRET!,{
        expiresIn:"1h"
    })
}

export const verifyToken = (token:string)=>{
     return jwt.verify(token,process.env.JWT_SECRET!)   
}