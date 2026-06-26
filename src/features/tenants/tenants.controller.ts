import { Request, Response} from "express";
import { tenantsService } from "./tenants.service";
import { create } from "node:domain";



export const tenantsController = {
    async create(req:Request, res:Response){
        const tenant = await tenantsService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Tenant created sucessfully",
            data: tenant,
        });
    },
};