import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";
import { HTTP_STATUS } from "../../utils/http-status";

export function validateCreateTenant (
    req: Request,
    res: Response,
    next: NextFunction
){
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === ""){
        throw new AppError(
            "Tenant name is required",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    next();
}

export function validateUpdateTenant (
    req: Request,
    res: Response,
    next: NextFunction
){
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === ""){
        throw new AppError(
            "Tenant name is required",
            HTTP_STATUS.BAD_REQUEST    
        );
    }

    next();
}


