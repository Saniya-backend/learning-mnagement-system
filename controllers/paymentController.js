const db = require("../config/db");

exports.createPayment = (req, res) => {
  const user_id = req.user.id;

  const { plan_id, course_id, payment_type } = req.body;

  if (!payment_type ) {
    return res.status(400).json({
      message: "Payment type is  required",
    });
  }

  if (payment_type === "plan" && !plan_id) {
    return res.status(400).json({
      message: "Plan id is required",
    });
  }

  if (payment_type === "course" && !course_id) {
    return res.status(400).json({
      message: "Course id is required",
    });
  }

  let query;
  let values;

  if (payment_type === "plan") {
    query = `
        SELECT * FROM payments
        WHERE user_id=?
        AND plan_id=?
        AND payment_status='active'
        `;

    values = [user_id, plan_id];
  } else {
    query = `
        SELECT * FROM payments
        WHERE user_id=?
        AND course_id=?
        AND payment_status='active'
        `;

    values = [user_id, course_id];
  }

  const insertPayment = (amount) => {
    db.query(
      `
            INSERT INTO payments
            (
                user_id,
                plan_id,
                course_id,
                amount,
                payment_type,
                payment_status
            )
            VALUES(?,?,?,?,?,?)
            `,
      [
        user_id,
        plan_id || null,
        course_id || null,
        amount,
        payment_type,
        "active",
      ],
      (err, paymentResult) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        if (payment_type === "course") {
          db.query(
            "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
            [user_id, course_id],
            (err, enrollResult) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              }

              if (enrollResult.length > 0) {
                return res.status(201).json({
                  message: "Payment Successful",
                  payment_id: paymentResult.insertId,
                });
              }

              db.query(
                "INSERT INTO enrollments(user_id, course_id) VALUES(?,?)",
                [user_id, course_id],
                (err) => {
                  if (err) {
                    return res.status(500).json({
                      message: err.message,
                    });
                  }

                  return res.status(201).json({
                    message: "Payment Successful & Course Enrolled",
                    payment_id: paymentResult.insertId,
                  });
                },
              );
            },
          );
        } else if (payment_type === "plan") {
          db.query(
            "SELECT duration_months FROM plans WHERE plan_id=?",
            [plan_id],
            (err, planResult) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,  
                });
              }

              if (planResult.length === 0) {
                return res.status(404).json({
                  message: "Plan Not Found",
                });
              }

              const duration_months = planResult[0].duration_months;

              const startDate = new Date();

              const endDate = new Date(startDate);
              endDate.setMonth(endDate.getMonth() + duration_months);

              const formatDate = (date) => {
                return date.toISOString().split("T")[0];
              };

              db.query(
                `INSERT INTO subscriptions
                                (
                                    payment_id,
                                    user_id,
                                    plan_id,
                                    start_date,
                                    end_date,
                                    status
                                )
                                VALUES(?,?,?,?,?,?)`,
                [
                  paymentResult.insertId,
                  user_id,
                  plan_id,
                  formatDate(startDate),
                  formatDate(endDate),
                  "active",
                ],
                (err) => {
                  if (err) {
                    return res.status(500).json({
                      message: err.message,
                    });
                  }

                  return res.status(201).json({
                    message: "Payment Successful & Subscription Created",
                    payment_id: paymentResult.insertId,
                  });
                },
              );
            },
          );
        }
      },
    );
  };

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length > 0) {
      return res.status(409).json({
        message: "Already Paid",
      });
    }

    if (payment_type === "plan") {
      return db.query(
        `SELECT *
                     FROM subscriptions
                     WHERE user_id=?
                     AND status='active'
                     AND end_date >= CURDATE()`,
        [user_id],
        (err, subscriptionResult) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          if (subscriptionResult.length > 0) {
            return res.status(409).json({
              message: "You already have an active subscription",
            });
          }
               db.query(
  "SELECT price FROM plans WHERE plan_id=?",
  [plan_id],
  (err, planResult) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (planResult.length === 0) {
      return res.status(404).json({
        message: "Plan Not Found",
      });
    }

    const amount = planResult[0].price;

    insertPayment(amount);
  }
               )
        },
      );
    }

db.query(
  "SELECT price FROM courses WHERE course_id=?",
  [course_id],
  (err, courseResult) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (courseResult.length === 0) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    const amount = courseResult[0].price;

    insertPayment(amount);
  }
);
  });
};
exports.getAllPayments = (req, res) => {
  db.query(
    `
        SELECT 
        p.*,
        u.name AS user_name,
        u.email,
        c.course_name,
        pl.name AS plan_name

        FROM payments p

        LEFT JOIN users u
        ON p.user_id=u.user_id

        LEFT JOIN courses c
        ON p.course_id=c.course_id

        LEFT JOIN plans pl
        ON p.plan_id=pl.plan_id

        ORDER BY p.payment_id DESC
        `,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      return res.status(200).json(result);
    },
  );
};

exports.getPaymentById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM payments WHERE payment_id=?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Payment Not Found",
      });
    }

    return res.status(200).json(result[0]);
  });
};
