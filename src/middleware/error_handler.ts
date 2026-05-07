import { NextFunction, Request, Response } from "express";
import config from "../config/env_config"

export interface appError extends Error {
    status?: number
}

export const errorHandler = (
    err: appError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("GENERATED ERROR FROM MIDDLEWARE >>>> ", err);

    const errStatus = err.status || 500;
    const errMsg = err.message || 'Internal Server Error';

    res.status(errStatus).json({
        error: true,
        msg: errMsg,
        status: errStatus,
        stack: config.nodeEnv === 'development' ? err.stack : {}
    })
}