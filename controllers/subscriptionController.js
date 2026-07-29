const db = require("../config/db");


exports.getAllSubscriptions = (req, res) => {
        
        
    db.query(
        `UPDATE subscriptions
         SET status='expired'
         WHERE end_date < CURDATE()
         AND status='active'`,
        (err) => {
            if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
    db.query(
        `SELECT s.* ,u.name as user_name,u.email,p.name as plan_name  FROM subscriptions s LEFT JOIN users u on s.user_id=u.user_id LEFT JOIN plans p on s.plan_id =p.plan_id ORDER BY s.subscription_id  DESC`,

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            return res.status(200).json(result);

        }
    );

        }
    );
}
exports.getSubscriptionById = (req, res) => {

    const { id } = req.params;
 

        db.query(
        `UPDATE subscriptions
         SET status='expired'
         WHERE end_date < CURDATE()
         AND status='active'`,
        (err) => { if(err){
                return res.status(500).json({
                    message:err.message
                });
            }
    db.query(
        `SELECT s.*, u.name as user_name,u.email,p.name as plan_name  FROM subscriptions s LEFT JOIN users u on s.user_id=u.user_id LEFT JOIN plans p on s.plan_id =p.plan_id WHERE S.subscription_id=?`,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Subscription Not Found"
                });
            }

            return res.status(200).json(result[0]);

        }
    );
}
        );
};
        

exports.updateSubscriptionStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            message: "Status is required"
        });
    }

    if (status !== "active" && status !== "expired") {
        return res.status(400).json({
            message: "Invalid Status"
        });
    }
db.query(
    "SELECT * FROM subscriptions WHERE subscription_id=?",
    [id],
    (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Subscription Not Found"
            });
        }

        db.query(
            "SELECT * FROM subscriptions WHERE subscription_id=? AND end_date < CURDATE()",
            [id],
            (err, expired) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                if (status === "active" && expired.length > 0) {
                    return res.status(400).json({
                        message: "Expired subscription cannot be activated"
                    });
                }
    db.query(
        "UPDATE subscriptions SET status=? WHERE subscription_id=?",
        [status, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
          

            return res.status(200).json({
                message: "Subscription Updated Successfully"
            });

        }
    );

}
 );
    }
);
};

exports.deleteSubscription = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM subscriptions WHERE subscription_id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Subscription Not Found"
                });
            }

            if (result[0].status === "active") {
                return res.status(400).json({
                    message: "Active Subscription Cannot Be Deleted"
                });
            }

            db.query(
                "DELETE FROM subscriptions WHERE subscription_id=?",
                [id],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    return res.status(200).json({
                        message: "Subscription Deleted Successfully"
                    });

                }
            );

        }
    );

};                                                                                                               