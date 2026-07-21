const db = require("../config/db");

exports.getAdminDashboard = (req, res) => {

    const dashboard = {};

    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, users) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        dashboard.totalUsers = users[0].totalUsers;

        db.query("SELECT COUNT(*) AS totalTeachers FROM teachers", (err, teachers) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            dashboard.totalTeachers = teachers[0].totalTeachers;

            db.query("SELECT COUNT(*) AS totalOrganizations FROM organizations", (err, organizations) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }

                dashboard.totalOrganizations = organizations[0].totalOrganizations;

                db.query("SELECT COUNT(*) AS totalCourses FROM courses", (err, courses) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }

                    dashboard.totalCourses = courses[0].totalCourses;

                    db.query("SELECT COUNT(*) AS totalEnrollments FROM enrollments", (err, enrollments) => {
                        if (err) {
                            return res.status(500).json({ message: err.message });
                        }

                        dashboard.totalEnrollments = enrollments[0].totalEnrollments;

                        return res.status(200).json({
                            message: "Welcome To Admin Dashboard",
                            dashboard
                        });
                    });
                });
            });
        });
    });

};