import { Request, Response} from "express";
import { tenantsService } from "./tenants.service";



export const tenantsController = {
    async create(req:Request, res:Response){
        const tenant = await tenantsService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Tenant created sucessfully",
            data: tenant,
        });
    },

    async getById(req: Request, res:Response){
        const tenant_id = Number(req.params.tenant_id);

        const tenant = await tenantsService.getById(tenant_id);

        return res.status(200).json({
            success: true,
            data: tenant,
        });
    }
};