exports.courseValidation = (req, res, next) => {
    const {
        course_name,
        description,
        price,
        category_id,
        teacher_id
    } = req.body;

    const missingFields = [];

    if (!course_name) missingFields.push("course_name");
    if (!description) missingFields.push("description");
    if (price == null) missingFields.push("price");
    if (!category_id) missingFields.push("category_id");
    if (!teacher_id) missingFields.push("teacher_id");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};