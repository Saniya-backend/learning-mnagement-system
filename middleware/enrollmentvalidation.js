exports.enrollmentValidation=(req,res,next)=>
{
    const{user_id,course_id}=req.body;

    if(!user_id||!course_id){
        return res.status(400).json({
            message:"User id and  course id's are required"
        });
    }
    next();
};