import { Request, Response, NextFunction } from "express";

import { AppError } from "../utils/app-error";
import { HTTP_STATUS } from "../utils/http-status";

export function validateIntegerParams(...fields: string[]) {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ): void => {
        for (const field of fields) {
            const value = req.params[field];

            if (
                typeof value !== "string" ||
                !Number.isInteger(Number(value))
            ) {
                throw new AppError(
                    `Invalid ${field}. Expected an integer.`,
                    HTTP_STATUS.BAD_REQUEST
                );
            }
        }

        next();
    };
}