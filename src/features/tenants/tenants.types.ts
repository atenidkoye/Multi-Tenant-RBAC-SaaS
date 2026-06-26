export interface CreateTenantDTO {
    name: string;
}

export interface UpdateTenantDTO {
    name: string;
    is_active: boolean;
}

export interface Tenant {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    created_at: Date;
    update_at: Date;
}