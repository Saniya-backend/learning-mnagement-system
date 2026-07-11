exports.teacherValidation = (req, res, next) => {
    const {
        organizations_id,
        user_id,
        specialization,
        qualification,
         experience,
         bio
    } = req.body;

    const missingFields = [];

    if (!organizations_id) missingFields.push("organizations_id");
    if (!user_id) missingFields.push("user_id");
    if (!specialization) missingFields.push("specialization");
    if (!qualification) missingFields.push("qualification");
    if (!experience) missingFields.push("experience");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};