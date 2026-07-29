exports.courseValidation = (req, res, next) => {

    const {
        course_name,
        description,
        price,
        category_id,
        teacher_id
    } = req.body;

    if (!course_name || course_name.trim() === "") {
        return res.status(400).json({
            message: "Course name is required"
        });
    }

    if (course_name.length > 100) {
        return res.status(400).json({
            message: "Course name cannot exceed 100 characters"
        });
    }

    if (!description || description.trim() === "") {
        return res.status(400).json({
            message: "Description is required"
        });
    }

    if (description.length > 1000) {
        return res.status(400).json({
            message: "Description cannot exceed 1000 characters"
        });
    }

    if (price === undefined || price === null || price === "") {
        return res.status(400).json({
            message: "Price is required"
        });
    }

    if (isNaN(price)) {
        return res.status(400).json({
            message: "Price must be a number"
        });
    }

    if (price <= 0 || price > 50000) {
        return res.status(400).json({
            message: "Price must be between 1 and 50000"
        });
    }

    if (!category_id) {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    if (req.user.role === "admin" && !teacher_id) {
        return res.status(400).json({
            message: "Teacher id is required"
        });
    }

    next();
};