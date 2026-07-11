exports.categoryValidation = (req, res, next) => {
    const { category_name, description } = req.body;

    if (!category_name) {
        return res.status(400).json({
            message: "Category name is required"
        });
    }

    if (!description) {
        return res.status(400).json({
            message: "Description is required"
        });
    }

     if(!category_name||!description){
        return res.status(400).json({
            message:"User id and  course id's are required"
        });
    }

    next();
};