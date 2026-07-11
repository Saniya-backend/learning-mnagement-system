 const db= require("../config/db");

exports.createCourse=(req,res)=>
{
    const{course_name,description,price,category_id,teacher_id}=req.body;
    
      db.query(
        " SELECT * FROM courses WHERE course_name=? AND category_id=? AND teacher_id=? ",[course_name,category_id,teacher_id],
         (err,result)=>{
        if(err){
              return res.status(500).json({
                message:err.message
                });

            }
          if(result.length>0)
          {
            return res.status(409).json({
                message:" This Course is Already exists in same category "
            });
          }
  
    db.query("INSERT INTO courses(course_name,description,price,category_id,teacher_id) VALUES(?,?,?,?,?)",[course_name,description,price,category_id,teacher_id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                message:err.message
                });

            }
            return res.status(201).json({
                message:"Course Created Successfully"
            });
        }
    );
}
      );
    };


exports.getAllCourses=(req,res)=>
{
    db.query(
        "SELECT * FROM courses",(err,result)=>{
            if(err){
                return res.status(500).json({
                message:err.message
                });
            }
            return res.status(200).json(result)
        }
    );
};

    exports.getCourseById=(req,res)=>
{
    const{id}=req.params;
    db.query("select * FROM courses where course_id=?",
        [id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            return res.status(201).json(result);

    
        }
    );
};
exports.updateCourse=(req,res)=>{
    const{id}=req.params;
    const{course_name,description,price,category_id,teacher_id}=req.body;

    db.query("UPDATE courses  SET course_name=?,description=? ,price=?,category_id=?,teacher_id=? WHERE course_id=?",
        [course_name,description,price,category_id,teacher_id,id],
        (err,result)=>
        {
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Course Not Found"
                });
            }
            return res.status(200).json({
                message:"Course updated Successfully"
            });

        }
    );
};

 exports.deleteCourse=(req,res)=>{
    const {id}=req.params;

    db.query("DELETE FROM courses WHERE course_id=?",[id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
               if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Course Not Found"
                });
            }
            return res.status(200).json({
                message:"Course Deleted Successfully"
            });

    });
 }