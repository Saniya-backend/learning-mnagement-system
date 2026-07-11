exports.enrollmentValidation=(req,res,next)=>
{
    const{user_id,course_id}=req.body;
    const missingFields = [];

    if (!user_id) missingFields.push("user_id");
    if (!course_id) missingFields.push("course_id");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};