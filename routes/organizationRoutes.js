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

router.get("/",verifyToken,authorizeRoles("admin","teacher","user"), organizationController.getAllOrganizations);

router.get("/:id",verifyToken,authorizeRoles("admin","teacher","user"),organizationController.getOrganizationById);

router.put(
      "/:id",
      verifyToken,
      organizationValidation,authorizeRoles("admin,teacher"),
      organizationController.updateOrganization
  );
router.delete("/:id",verifyToken,authorizeRoles("admin,teacher"),organizationController.deleteOrganization);

module.exports=router;   