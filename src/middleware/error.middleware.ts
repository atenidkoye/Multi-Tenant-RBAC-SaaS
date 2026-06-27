import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../utils/http-status";

export function errorMiddleware(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) : void{
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
        });
        
        return;
    }

    console.log(err);

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
    });
}