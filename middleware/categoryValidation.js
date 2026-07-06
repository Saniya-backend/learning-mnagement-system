exports.categoryValidation=(req,res,next)=>
{
    const{category_name,description}=req.body;

    if(!category_name||description){
        return res.status(400).json({
            message:"Category name and description are required"
        });
    }
    next();
};