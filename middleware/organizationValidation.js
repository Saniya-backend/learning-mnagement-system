 exports.organizationValidation=(req,res,next)=>
{
    const{organization_name,description,email,phone,address}=req.body;

    if(!organization_name||!description||!email||!phone||!address){
        return res.status(400).json({
            message:"All fields are required(name,email,description,phone,address)"
        });
    }
    next();
};