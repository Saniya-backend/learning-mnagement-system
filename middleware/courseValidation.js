exports.courseValidation=(req,res,next)=>
{
    const{course_name,description,price,category_id,teacher_id}=req.body;
    if(!course_name||!description||price==null||!category_id||!teacher_id)
{
  return res.status(400).json({
            message:"All fields are required"
        });
}
};