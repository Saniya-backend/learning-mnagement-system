 exports.organizationValidation=(req,res,next)=>
{
    const{organization_name,description,email,phone,address}=req.body;

    const missingFields = [];

    if (!organization_name) missingFields.push("organization_name");
    if (!description) missingFields.push("description");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};