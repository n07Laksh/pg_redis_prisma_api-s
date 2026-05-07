import { Request, Response, NextFunction } from "express";

export const test1 = (req:Request, res:Response, next:NextFunction)=>{
    res.json({msg:"this route is working fine"})
}