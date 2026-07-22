const db=require("../config/db");

exports.createEnrollment=(req,res)=>{
        console.log(req.user);
const user_id = req.user.id;

const {course_id}=req.body;



db.query(

"SELECT * FROM enrollments WHERE user_id=? AND course_id=?",

[user_id,course_id],

(err,result)=>{


if(err){

return res.status(500).json({
message:err.message
});

}



if(result.length>0){

return res.status(400).json({

message:"Already Enrolled"

});

}




db.query(

"INSERT INTO enrollments(user_id,course_id) VALUES(?,?)",

[user_id,course_id],


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


}


);


};

exports.getAllEnrollments = (req, res) => {
  const sql = `
    SELECT 
      e.enrollment_id,
      u.name AS student_name,
      u.email AS student_email,
      c.course_name,
      tuser.name AS teacher_name,
      e.enrolled_at
    FROM enrollments e
    JOIN users u
      ON e.user_id = u.user_id
    JOIN courses c
      ON e.course_id = c.course_id
    LEFT JOIN teachers t
      ON c.teacher_id = t.teacher_id
    LEFT JOIN users tuser
      ON t.user_id = tuser.user_id
    ORDER BY e.enrolled_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    return res.status(200).json(result);
  });
};  

exports.getEnrollmentById=(req,res)=>{


const {id}=req.params;



db.query(

"SELECT * FROM enrollments WHERE enrollment_id=?",

[id],

(err,result)=>{


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


);


};


exports.deleteEnrollments=(req,res)=>{


const {id}=req.params;



db.query(

"DELETE FROM enrollments WHERE enrollment_id=?",

[id],


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


}


);


};