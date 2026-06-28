import slugify from "slugify";
import { tenantsRepository } from "./tenants.repository";
import { CreateTenantDTO } from "./tenants.types";
import { AppError } from "../../utils/app-error";
import { HTTP_STATUS } from "../../utils/http-status";

export const tenantsService = {
    async create(data: CreateTenantDTO) {
        const slug = slugify(data.name,{
            lower: true,
            strict: true,
        });

        const existingTenant = await tenantsRepository.getBySlug(slug);

        if (existingTenant){
            throw new AppError("Tenant already exists",
                HTTP_STATUS.FORBIDDEN
            )
        }

        return tenantsRepository.create(data,slug);
    },

    async getById(id: number){
        const tenant = await tenantsRepository.getById(id);

        if(!tenant) {
            throw new AppError(
                "Tenant not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        return tenant;
    },

    async getAll() {
        return await tenantsRepository.getAll()
    },

    

    async update(
        tenantId: number,
        data:{
            name: string;
        },
    ) {
       
        const slug = slugify(data.name,{
            lower: true,
            strict:  true,
        });

        const tenant = await tenantsRepository.update(
            tenantId,

            {
                name: data.name,
                slug,
            }
        )

        if(!tenant){
            throw new AppError(
                "Tenant not found",
                HTTP_STATUS.NOT_FOUND
            );
        }

        return tenant;
    }, 

    async delete(tenantId: number){
        const tenant = await tenantsRepository.getById(tenantId);

        if(!tenant) {
            throw new AppError(
                "Tenant not found",
                HTTP_STATUS.NOT_FOUND
            );
        } if(!tenant.is_active){
            throw new AppError(
                "Tenant is already inactive",
                HTTP_STATUS.BAD_REQUEST        
            );
        }

        return tenantsRepository.delete(tenantId)
    },




};

