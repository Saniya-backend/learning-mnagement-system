   const db=require("../config/db");

 exports.createOrganization=(req,res)=>
 {
    const{organization_name,description,email,address,phone}=req.body;

    db.query(
        " SELECT * FROM organizations WHERE organization_name=? OR email=?",[organization_name,email],
         (err,result)=>{
        if(err){
              return res.status(500).json({
                message:err.message
                });

            }
          if(result.length>0)
          {
            return res.status(409).json({
                message:"Organization Already exists "
            });
          }
  
  db.query("INSERT INTO organizations(organization_name,description,email,address,phone)values(?,?,?,?,?)",
    [organization_name,description,email,address,phone],
    (err,result)=>{
        if(err){
              return res.status(500).json({
                message:err.message
                });

            }
        
    
               return res.status(201).json({
            message: "Organization Created successfully"
        });
    });
  }
);
};

 exports.getAllOrganizations=(req,res)=>{
    db.query(
        "SELECT * FROM organizations",(err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            return res.status(200).json(result)
        }
    );
 }
 exports.getOrganizationById=(req,res)=>
 {
    const{id}=req.params;

    db.query("SELECT * FROM organizations where organizations_id=?",
        [id],
        (err,result)=>
        {
             if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.length===0){
                return res.status(404).json({
                    message:"Organization Not Found"
                });
            }
            return res.status(200).json(result[0]);
        }
    )
 }

 
exports.updateOrganization=(req,res)=>{
    const{id}=req.params;
    const{organization_name,email,description,phone,address}=req.body;

    db.query("UPDATE organizations SET organization_name=?,email=? ,description=?,phone=?,address=? WHERE organizations_id=?",
        [organization_name,email,description,phone,address,id],
        (err,result)=>
        {
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Organization Not Found"
                });
            }
            return res.status(200).json({
                message:"Organizations updated Successfully"
            });

        }
    );
};
 exports.deleteOrganization=(req,res)=>{
    const {id}=req.params;

    db.query("DELETE FROM organizations WHERE organizations_id=?",[id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
               if(result.affectedRows===0){
                return res.status(404).json({
                    message:"organization Not Found"
                });
            }
            return res.status(200).json({
                message:"organization Deleted Successfully"
            });

    });
 }
