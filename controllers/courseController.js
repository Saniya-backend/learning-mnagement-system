 const db = require("../config/db");

exports.createCourse = (req, res) => {

    const {
        course_name,
        description,
        price,
        category_id,
        teacher_id 
    } = req.body;
      
    db.query(
        "SELECT * FROM courses WHERE course_name=?",
        [course_name],
        (err, result) => {

            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }


            if(result.length > 0){
                return res.status(409).json({
                    message: "Course Already exists"
                });
            }
    if (req.user.role === "admin") {

        db.query(
            `INSERT INTO courses
            (course_name, description, price, category_id, teacher_id)
            VALUES (?, ?, ?, ?, ?)`,
            [course_name, description, price, category_id, teacher_id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                return res.status(201).json({
                    message: "Course Created Successfully"
                });

            }
        );

    }

    else {

       const user_id = req.user.id;

        db.query(
            "SELECT teacher_id FROM teachers WHERE user_id=?",
            [user_id],
            (err, teacherResult) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                if (teacherResult.length === 0) {
                    return res.status(404).json({
                        message: "Teacher Profile Not Found"
                    });
                }

                const teacher_id = teacherResult[0].teacher_id;

                db.query(
                    `INSERT INTO courses
                    (course_name, description, price, category_id, teacher_id)
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        course_name,
                        description,
                        price,
                        category_id,
                        teacher_id
                    ],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json({
                                message: err.message
                            });
                        }

                        return res.status(201).json({
                            message: "Course Created Successfully"
                        });

                    }
                );

            }
        );

    }
        });
    };

exports.getAllCourses = (req,res)=>{

db.query(`
SELECT

c.course_id,
c.course_name,
c.description,
c.price,

c.category_id,
c.teacher_id,

cat.category_name,

u.name AS teacher_name


FROM courses c


LEFT JOIN categories cat
ON c.category_id = cat.category_id


LEFT JOIN teachers t
ON c.teacher_id = t.teacher_id


LEFT JOIN users u
ON t.user_id = u.user_id


`,
(err,result)=>{


if(err){

return res.status(500).json({
message:err.message
});

}


return res.status(200).json(result);


});


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