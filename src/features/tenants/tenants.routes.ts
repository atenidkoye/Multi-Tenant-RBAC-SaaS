import express from "express";
import { tenantsController } from "./tenants.controller";
import { validateCreateTenant } from "./tenants.middleware";


const router = express.Router();

router.post("/", validateCreateTenant, tenantsController.create);
router.get("/:tenant_id", tenantsController.getById)


export default router;