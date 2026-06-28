import express from "express";
import { tenantsController } from "./tenants.controller";
import { validateCreateTenant,  validateUpdateTenant } from "./tenants.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { validateIntegerParams } from "../../middleware/validateIntegerParams"
import { tenantsRepository } from "./tenants.repository";
import { tenantsService } from "./tenants.service";


const router = express.Router();

router.post("/", validateCreateTenant, 
    asyncHandler(tenantsController.create));

router.get("/:tenant_id", 
    validateIntegerParams("tenant_id"),
  asyncHandler(tenantsController.getById))

  router.get("/", 
    asyncHandler(tenantsController.getAll)
  )

router.put("/:tenant_id",
  validateIntegerParams("tenant_id"),
  validateUpdateTenant,
  asyncHandler(tenantsController.update)
)

router.delete("/:tenant_id",
  validateIntegerParams("tenant_id"),
  asyncHandler(tenantsController.delete)
)


export default router;