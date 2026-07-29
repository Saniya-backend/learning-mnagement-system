const db = require("../config/db");

exports.createPlan = (req, res) => {
    
    const { name, duration_months, price, description, status } = req.body;
           if(duration_months < 1 || duration_months > 12){
        return res.status(400).json({
            message:"Plan duration must be between 1 and 12 months"
        });
    }
    db.query(
        "SELECT * FROM plans WHERE name=?",
        [name],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "Plan Already Exists"
                });
            }
                
            db.query(
                "INSERT INTO plans(name,duration_months,price,description,status) VALUES(?,?,?,?,?)",
                [
                    name,
                    duration_months,
                    price,
                    description,
                    status || "active"
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    return res.status(201).json({
                        message: "Plan Created Successfully"
                    });
                }
            );
        }
    );
};

exports.getAllPlans = (req, res) => {

    db.query(
        "SELECT * FROM plans ORDER BY plan_id DESC",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json(result);

        }
    );

};

exports.getPlanById = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM plans WHERE plan_id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Plan Not Found"
                });
            }

            return res.status(200).json(result[0]);

        }
    );

};

exports.updatePlan = (req, res) => {

    const { id } = req.params;
    const { name, duration_months, price, description, status } = req.body;

    db.query(
        "UPDATE plans SET name=?,duration_months=?,price=?,description=?,status=? WHERE plan_id=?",
        [
            name,
            duration_months,
            price,
            description,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Plan Not Found"
                });
            }

            return res.status(200).json({
                message: "Plan Updated Successfully"
            });

        }
    );

};

exports.deletePlan = (req,res)=>{

    const {id}=req.params;


    db.query(
        `SELECT * FROM subscriptions 
         WHERE plan_id=? 
         AND status='active'
         AND end_date >= CURDATE()`,
        [id],
        (err,result)=>{


            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }


            if(result.length > 0){

                return res.status(400).json({
                    message:"Plan cannot be deleted while subscription is active"
                });

            }



            db.query(
                "DELETE FROM plans WHERE plan_id=?",
                [id],
                (err,result)=>{


                    if(err){
                        return res.status(500).json({
                            message:err.message
                        });
                    }


                    if(result.affectedRows===0){

                        return res.status(404).json({
                            message:"Plan Not Found"
                        });

                    }


                    return res.status(200).json({
                        message:"Plan Deleted Successfully"
                    });

                }
            );


        }
    );

};  