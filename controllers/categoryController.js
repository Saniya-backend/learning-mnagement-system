const db = require("../config/db");

exports.createCategory = (req, res) => {

    const { category_name, description } = req.body;
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


            console.log("Teacher Result:", teacherResult);


            if (teacherResult.length === 0) {
                return res.status(404).json({
                    message: "Teacher Profile Not Found"
                });
            }


            const teacher_id = teacherResult[0].teacher_id;

            db.query(
                "SELECT * FROM categories WHERE category_name=? AND teacher_id=?",
                [category_name, teacher_id],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }


                    if (result.length > 0) {
                        return res.status(409).json({
                            message: "Category already exists"
                        });
                    }


                
                    db.query(
                        "INSERT INTO categories(category_name, description, teacher_id) VALUES(?,?,?)",
                        [
                            category_name,
                            description,
                            teacher_id
                        ],
                        (err, result) => {

                            if (err) {
                                return res.status(500).json({
                                    message: err.message
                                });
                            }


                            return res.status(201).json({
                                message: "Category Created Successfully"
                            });

                        }
                    );

                }
            );

        }
    );

};
exports.getAllCategories=(req,res)=>{
    const user_id = req.user.id;
  db.query(
    `SELECT c.*
     FROM categories c
     JOIN teachers t
     ON c.teacher_id = t.teacher_id
     WHERE t.user_id=?`,
    [user_id],
    (err,result)=>{
        if(err){
            return res.status(500).json({
                message:err.message
            });
        }

        return res.status(200).json(result);
    }
  );
}
exports.getCategoryById=(req,res)=>{
    const{id}=req.params;

    db.query("SELECT * FROM categories WHERE category_id=?",
        [id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.length===0){
                return res.status(404).json({
                    message:"Category Not Found"
                });
            }
            return res.status(200).json(result[0]);
        }
    );
};

exports.updateCategory=(req,res)=>{
    const{id}=req.params;
    const{category_name,description,teacher_id}=req.body;
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
            `UPDATE categories
             SET category_name=?, description=?
             WHERE category_id=? AND teacher_id=?`,
            [category_name, description, id, teacher_id],
            (err,result)=>{

                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }
                 if (teacherResult.length === 0) {
    return res.status(404).json({
        message: "Teacher Profile Not Found"
    });
} 
        const teacher_id = teacherResult[0].teacher_id;

                if(result.affectedRows===0){
                    return res.status(403).json({
                        message:"Category Not Found Or Access Denied"
                    });
                }

                return res.status(200).json({
                    message:"Category Updated Successfully"
                });

            }
        );

    }
);
};
 exports.deleteCategory=(req,res)=>{
    const {id}=req.params;
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
            "DELETE FROM categories WHERE category_id=? AND teacher_id=?",
            [id, teacher_id],
            (err,result)=>{

                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }

                if(result.affectedRows===0){
                    return res.status(403).json({
                        message:"Category Not Found Or Access Denied"
                    });
                }

                return res.status(200).json({
                    message:"Category Deleted Successfully"
                });

            }
        );

    }
);
};