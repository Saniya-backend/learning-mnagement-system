const db=require("../config/db");

exports.createCategory=(req,res)=>
{
    const{category_name,description}=req.body;
    db.query("INSERT INTO categories(category,description)VALUES(?,?)",[category_name,description],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                message:err.message
                });

            }
            return res.status(201).json({
                message:"Category Created Successfully"
            });
        }
    );
}; 
exports.getAllCategories=(req,res)=>{
    db.query(
        "SELECT * from categories ",(err,result)=>{
            if(err){
                return res.status(500).json({
                message:err.message
                });
            }
            return res.status(200).json(result)
        }
    );
};
exports.getCategoryById=(req,res)=>
{
    const{id}=req.params;
    db.query("select * FROM categories where category_id=?",
        [id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            return res.status(201).json

            (result);
        }
    );
};

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
    const{category_name,description}=req.body;

    db.query("UPDATE categories SET category_name=?,description=? WHERE category_id=?",
        [id],
        (err,result)=>
        {
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
            if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Category Not Found"
                });
            }
            return res.status(200).json({
                message:"Category updated Successfully"
            });

        }
    );
};
 exports.deleteCategory=(req,res)=>{
    const {id}=req.params;

    db.query("DELETE FROM categories WHERE category_id=?",[id],
        (err,result)=>{
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
               if(result.affectedRows===0){
                return res.status(404).json({
                    message:"Category Not Found"
                });
            }
            return res.status(200).json({
                message:"Category Deleted Successfully"
            });

    });
 }