 const db=require("../config/db");

 exports.createEnrollment=(req,res)=>
 {
    const{user_id,course_id}=req.body;
  db.query("INSERT INTO enrollments (user_id,course_id)values(?,?)",[user_id,course_id],
    (err,result)=>{
        if(err){
              return res.status(500).json({
                message:err.message
                });

            }
            return res.status(201).json({
                message:"Enrolled Successfully"
        });
    }
  );
 };

 exports.getAllEnrollments=(req,res)=>{
    db.query(
        "SELECT * FROM enrollments",(err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            return res.status(200).json(result)
        }
    );
 }
 exports.getEnrollmentById=(req,res)=>
 {
    const{id}=req.params;

    db.query("SELECT * FROM enrollments where enrollment_id=?",
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
                    message:"Enrollment Not Found"
                });
            }
            return res.status(200).json(result[0]);
        }
    )
 }
 exports.deleteEnrollments=(req,res)=>{
    const {id}=req.params;

    db.query("DELETE FROM enrollments WHERE enrollment_id=?",[id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
               if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Enrollment Not Found"
                });
            }
            return res.status(200).json({
                message:"Enrollment Deleted Successfully"
            });

    });
 }