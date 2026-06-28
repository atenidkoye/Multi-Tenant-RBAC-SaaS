import { pool } from "../../core/database/pool";
import { CreateTenantDTO } from "./tenants.types";
import { Tenant } from "./tenants.types";

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
   },

   async getAll() {
        const result = await pool.query(`
        SELECT 
            id,
            name,
            slug,
            is_active,
            created_at,
            updated_at
        FROM tenants
        ORDER BY id;
            
        `);

        return result.rows;
    },

    async update(
        tenantId: number,
        data: {
            name: string;
            slug: string;
        }
    ): Promise<Tenant | undefined> {


        const UPDATE_SQL = `
            UPDATE tenants
            SET 

                name = $1,
                slug = $2,
                updated_at = CURRENT_TIMESTAMP
            
            WHERE id = $3
            RETURNING
                id,
                name,
                slug,
                is_active,
                created_at,
                updated_at;

        `;

        const result = await pool.query(
            UPDATE_SQL,
            [
                data.name,
                data.slug,
                tenantId,
            ]
        );

        return result.rows[0];

    }, 
    
        async delete(
        tenantId: number,
    ): Promise<Tenant | undefined> {


        const DELETE_SQL = `
            UPDATE tenants
            SET 

                is_active = false,
                updated_at = CURRENT_TIMESTAMP       
            WHERE id = $1
            RETURNING
                id,
                name,
                slug,
                is_active,
                created_at,
                updated_at;

        `;

        const result = await pool.query(
            DELETE_SQL,
            [
                tenantId
                
            ]
        );

        return result.rows[0];

    }


    

}