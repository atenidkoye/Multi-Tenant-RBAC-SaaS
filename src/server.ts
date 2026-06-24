import express from "express";

const app = express();

app.get("/", (_req, res) =>{
    res.json({
        message: "RBAC SaaS API"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`sever running on port ${PORT}`)
});