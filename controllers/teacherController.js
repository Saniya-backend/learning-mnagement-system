const db=require("../config/db");
exports.createTeacher=(req,res)=>{
    const{
        organizations_id,user_id,specialization,qualification,experience,bio
    }=req.body;
       
    
       db.query(
    "SELECT * FROM teachers WHERE user_id = ? AND organizations_id = ?",
    [user_id, organizations_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

    
      if (result.length > 0) {
        return res.status(409).json({
          message: "Teacher already exists in this organization",
        });
      }


    db.query("insert into teachers(organizations_id,user_id,specialization,qualification,experience,bio) Value(?,?,?,?,?,?)",[organizations_id,user_id,specialization,qualification,experience,bio],
        (err,result)=>{
         if(err) {
            return res.status(500).json({
                message:err.message
            });
        }
            return res.status(201).json({
                message:"Teacher Created Successflly "
            });
        }
    );
    }
);
};
exports.getAllTeachers = (req,res)=>{

    db.query(
`
SELECT 
teachers.teacher_id,
teachers.user_id,
teachers.organizations_id,
teachers.specialization,
teachers.qualification,
teachers.experience,
teachers.bio,

users.name AS teacher_name,

organizations.organization_name

FROM teachers

JOIN users
ON teachers.user_id = users.user_id

JOIN organizations
ON teachers.organizations_id = organizations.organizations_id

`,
(err,result)=>{


if(err){

return res.status(500).json(err);

}


res.json(result);


});


};
 exports.getTeacherById=(req,res)=>
 {
    const{id}=req.params;

    db.query("SELECT * FROM teachers where teacher_id=?",
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
                    message:"Teacher Not Found"
                });
            }
            return res.status(200).json(result[0]);
        }
    )
 }
  exports.updateTeacher=(req,res)=>{
     const {id}=req.params;
      const{
        organizations_id,user_id,specialization,qualification,experience,bio
    }=req.body;
     db.query("UPDATE teachers set organizations_id=?,user_id=?,specialization=?,qualification=?,experience=?,bio=? Where teacher_id=?",[organizations_id,user_id,specialization,qualification,experience,bio,id],
        (err,result)=>
        {
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Teacher Not Found"
                });
            }
            return res.status(200).json({
                message:"Teacher updated Successfully"
            });

        }
    );
};

  
 exports.deleteTeacher=(req,res)=>{
    const {id}=req.params;

    db.query("DELETE FROM  teachers WHERE teacher_id=?",[id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
               if(result.affectedRows===0){
                return res.status(404).json({
                    message:"teacher Not Found"
                });
            }
            return res.status(200).json({
                message:"teacher Deleted Successfully"
            });

    });
 }
 
 