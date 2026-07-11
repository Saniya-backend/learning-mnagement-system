 const express = require("express");
const router = express.Router();

const organizationController =require("../controllers/organizationController");
const{verifyToken} = require("../middleware/authMiddleware");
const{ organizationValidation }= require("../middleware/organizationValidation");

router.post("/",
    verifyToken,
    organizationValidation,
    organizationController.createOrganization
);

router.get("/",verifyToken, organizationController.getAllOrganizations);

router.get("/:id",verifyToken,organizationController.getOrganizationById);

router.put(
      "/:id",
      verifyToken,
      organizationValidation,
      organizationController.updateOrganization
  );
router.delete("/:id",verifyToken,organizationController.deleteOrganization);

module.exports=router;   