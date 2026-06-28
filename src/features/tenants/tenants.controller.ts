import { Request, Response} from "express";
import { tenantsService } from "./tenants.service";
import { HTTP_STATUS } from "../../utils/http-status";



export const tenantsController = {
    async create(req:Request, res:Response){
        const tenant = await tenantsService.create(req.body);

        return res.status(HTTP_STATUS.CREATED).json({
            message: "Tenant created successfully",
            data: tenant,
        });
    },

    async getById(req: Request, res:Response){
        const tenant_id = Number(req.params.tenant_id);

        const tenant = await tenantsService.getById(tenant_id);

        return res.status(HTTP_STATUS.OK).json({
            data: tenant,
        });
    },

    async getAll(req: Request, res: Response) {
        const tenants = await tenantsService.getAll();

        return res.status(HTTP_STATUS.OK).json({
            data: tenants,
        });
    },

    async update(req: Request, res: Response){
        const tenantId = Number(req.params.tenant_id)

        const tenant = await tenantsService.update(tenantId,req.body);

        return res.status(HTTP_STATUS.OK).json({
            message: "Tenant successfully updated",
            data: tenant,
        });
    },

    async delete(req: Request, res:Response){
        const tenantId = Number(req.params.tenant_id)

        const tenant = await tenantsService.delete(tenantId);

        return res.status(HTTP_STATUS.OK).json({
            message: "Tenant successfully deleted",
            data: tenant,
        });
    }

};