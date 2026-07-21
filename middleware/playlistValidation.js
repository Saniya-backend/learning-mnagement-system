exports.playlistValidation = (req, res, next) => {
    const { course_id, title } = req.body;

    const missingFields = [];

    if (!course_id) missingFields.push("course_id");
    if (!title) missingFields.push("title");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};