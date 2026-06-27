import express from "express";
import { tenantsController } from "./tenants.controller";
import { validateCreateTenant } from "./tenants.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateIntegerParams } from "../../middleware/validateIntegerParams"


const router = express.Router();

router.post("/", validateCreateTenant, 
    asyncHandler(tenantsController.create));

router.get("/:tenant_id", 
    validateIntegerParams("tenant_id"),
  asyncHandler(tenantsController.getById))

  router.get("/", 
    asyncHandler(tenantsController.getAll)
  )


export default router;