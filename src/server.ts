import express from "express";
import { pool } from "./config/database"
import { authService } from "./features/auth/auth.service";

const app = express();

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
        console.error("Database error:", error)

        
        res.status(500).json({
            success: false,
            database: "disconnected",
            error,
        });
    }
});


app.get("/test-hash", async (_req, res) => {
    const hash = await authService.hashPassword("password123");

    res.json({
        password: "password123",
        hash,
    });
});



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});