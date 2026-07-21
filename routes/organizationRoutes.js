 const express = require("express");
const router = express.Router();

const organizationController =require("../controllers/organizationController");
const{verifyToken} = require("../middleware/authMiddleware");
const{ organizationValidation }= require("../middleware/organizationValidation");
const { authorizeRoles } = require("../middleware/roleMiddleware");
router.post("/",
    verifyToken,
    organizationValidation,authorizeRoles("admin"),
    organizationController.createOrganization
);

router.get("/",verifyToken,authorizeRoles("admin"), organizationController.getAllOrganizations);

router.get("/:id",verifyToken,authorizeRoles("admin"),organizationController.getOrganizationById);

router.put(
      "/:id",
      verifyToken,
      organizationValidation,authorizeRoles("admin"),
      organizationController.updateOrganization
  );
router.delete("/:id",verifyToken,authorizeRoles("admin"),organizationController.deleteOrganization);

module.exports=router;   