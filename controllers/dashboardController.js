exports.getDashboard=(req,res)=>
{
    const user=req.user;

    if(user.role==="teacher"){
        return res.status(200).json({
            message:"Welcome To Teacher Dashboard",
            user
        });
    }
    if(user.role==="user"){
        return res.status(200).json(
            {
                message:"Welcome to user dashboard",
                user
            }
        );
    }
    return res.status(403).json(
        {
            message:"Invalid Role"
        }
    );
};