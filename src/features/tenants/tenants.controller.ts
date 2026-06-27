import { Request, Response, NextFunction} from "express";
import { tenantsService } from "./tenants.service";
import { HTTP_STATUS } from "../../utils/http-status";



export const tenantsController = {
    async create(req:Request, res:Response, next:NextFunction){
        const tenant = await tenantsService.create(req.body);

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: "Tenant created sucessfully",
            data: tenant,
        });
    },

    async getById(req: Request, res:Response, next:NextFunction){
        const tenant_id = Number(req.params.tenant_id);

        const tenant = await tenantsService.getById(tenant_id);

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            data: tenant,
        });
    },

    async getAll(req: Request, res: Response) {
        const tenants = await tenantsService.getAll();

        return res.status(HTTP_STATUS.OK).json({
            data: tenants,
        });
    }
};