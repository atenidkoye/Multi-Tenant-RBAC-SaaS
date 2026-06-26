import { pool } from "../../core/database/pool";
import { CreateTenantDTO } from "./tenants.types";

export const tenantsRepository = {
    async create (data: CreateTenantDTO, slug: string) {
        const query = `
            INSERT INTO tenants 
            (
                name,
                slug
            )
            VALUES
            ($1, $2)
            RETURNING *;
            `;

            const values = [
                data.name,
                slug,
            ];

            const { rows } = await pool.query(query, values);

            return rows[0];
    },

    async getBySlug(slug: string) {
    const query = `
        SELECT * 
        FROM tenants 
        WHERE slug = $1;
    
    `;

    const { rows } = await pool.query(query, [slug]);

    return rows[0];
   },



   async getById(id: number) {
    const query = `
    select * 
    FROM tenants
    WHERE id = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
   }
};

