const express = require("express");
const router = express.Router();

const categoryController =require("../controllers/categoryController");
const{verifyToken} = require("../middleware/authMiddleware");
const{ categoryValidation }= require("../middleware/categoryValidation");
 const { authorizeRoles } = require("../middleware/roleMiddleware");
router.post("/",
    verifyToken,
            authorizeRoles( "teacher"),
    categoryController.createCategory
);

router.get("/",verifyToken,authorizeRoles("admin", "teacher"),categoryController.getAllCategories);

router.get("/:id",verifyToken,authorizeRoles("admin", "teacher"),categoryController.getCategoryById);
router.put(
    "/:id",
    verifyToken,authorizeRoles( "teacher"),
    categoryValidation,
    categoryController.updateCategory
);

router.delete("/:id",verifyToken,authorizeRoles("admin", "teacher"),categoryController.deleteCategory);

module.exports=router;