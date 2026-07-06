const express = require("express");
const router = express.Router();

const categoryController =require("../controllers/categoryController");
const{verifyToken} = require("../middleware/authMiddleware");
const{ categoryValidation }= require("../middleware/categoryValidation");

router.post("/",
    verifyToken,
    categoryValidation,
    categoryController.createCategory
);

router.get("/",verifyToken,categoryController.getAllCategories);

router.get("/:id",verifyToken,categoryController.updateCategory);
router.put(
    "/:id",
    verifyToken,
    categoryValidation,
    categoryController.updateCategory
);

router.delete("/:id",verifyToken,categoryController.deleteCategory);

module.exports=router;