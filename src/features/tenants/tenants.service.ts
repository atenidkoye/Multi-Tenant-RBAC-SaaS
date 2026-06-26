import slugify from "slugify";
import { tenantsRepository } from "./tenants.repository";
import { CreateTenantDTO } from "./tenants.types";


export const tenantsService = {
    async create(data: CreateTenantDTO) {
        const slug = slugify(data.name,{
            lower: true,
            strict: true,
        });

        const existingTenant = await tenantsRepository.getBySlug(slug);

        if (existingTenant){
            throw new Error("Tenant already exists")
        }

        return tenantsRepository.create(data,slug);
    },
};