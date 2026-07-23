const db = require("../config/db");

exports.createPlan = (req, res) => {
    const { course_id, name, duration_months, price, description, status } = req.body;
    const teacher_id = req.user.id;

    db.query(
      `SELECT c.course_id
         FROM courses c
         JOIN teachers t ON c.teacher_id = t.teacher_id
         WHERE c.course_id = ? AND t.user_id = ?`,
        [course_id, teacher_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length === 0) {
                return res.status(403).json({
                    message: "You can only create plans for your own courses"
                });
            }

            db.query(
                "SELECT * FROM plans WHERE name=? OR course_id=?",
                [name, course_id],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    if (result.length > 0) {
                        return res.status(409).json({
                            message: "Plan Already exists"
                        });
                    }

                    db.query(
                        "INSERT INTO plans(course_id, name, duration_months, price, description, status) VALUES(?,?,?,?,?,?)",
                        [course_id, name, duration_months, price, description, status || "active"],
                        (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    message: err.message
                                });
                            }

                            return res.status(201).json({
                                message: "Plan Created successfully"
                            });
                        }
                    );
                }
            );
        }
    );
};

exports.getAllPlans = (req, res) => {
    db.query(
        `SELECT p.*, c.course_name
         FROM plans p
         JOIN courses c ON p.course_id = c.course_id
         ORDER BY p.plan_id DESC`,
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
        "UPDATE plans SET name=?, duration_months=?, price=?, description=?, status=? WHERE plan_id=?",
        [name, duration_months, price, description, status, id],
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
                message: "Plan updated Successfully"
            });
        }
    );
};

exports.getPlansByCourse = (req, res) => {
    const { course_id } = req.params;

    db.query(
        "SELECT * FROM plans WHERE course_id = ? AND status = 'active'",
        [course_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err
                });
            }

            return res.status(200).json(result);
        }
    );
};

exports.deletePlan = (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM plans WHERE plan_id=?",
        [id],
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
                message: "Plan Deleted Successfully"
            });
        }
    );
};