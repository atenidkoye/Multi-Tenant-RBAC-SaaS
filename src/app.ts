import express from "express";
import tenantRoutes from "./features/tenants/tenants.routes";
import { authService } from "./features/auth/auth.service";
import { pool } from "./config/database";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "RBAC SaaS API",
    });
});

app.get("/health/db", async (_req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            success: true,
            database: "connected",
            timestamp: result.rows[0].now,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            database: "disconnected",
            error,
        });
    }
});


// Register feature routes
app.use("/api/v1/tenants", tenantRoutes);

app.use(errorMiddleware);

export default app;