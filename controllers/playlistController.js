const db = require("../config/db");

exports.createPlaylist = (req, res) => {

    const {
        course_id,
        title,
        description,
        order_no
    } = req.body;

    const created_by = req.user.id;
    const role = req.user.role;


    const insertPlaylist = () => {

        db.query(
            `INSERT INTO playlists
            (course_id, title, description, order_no, created_by)
            VALUES (?, ?, ?, ?, ?)`,
            [
                course_id,
                title,
                description,
                order_no || 1,
                created_by
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                return res.status(201).json({
                    message: "Playlist Created Successfully",
                    playlist_id: result.insertId
                });

            }
        );

    };


    if (role === "teacher") {

      db.query(
`
SELECT courses.*
FROM courses
JOIN teachers
ON courses.teacher_id = teachers.teacher_id
WHERE courses.course_id=? 
AND teachers.user_id=?
`,
[course_id, created_by],
(err,result)=>{

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.length === 0) {
                    return res.status(403).json({
                        message: "You cannot create playlist for this course"
                    });
                }


                insertPlaylist();

            }
        );


    } else if (role === "admin") {

        insertPlaylist();

    } else {

        return res.status(403).json({
            message:"Only admin and teacher can create playlist"
        });

    }

};

exports.getAllPlaylists = (req, res) => {

    db.query(
        "SELECT * FROM playlists ORDER BY course_id, order_no ASC",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(200).json(result);
        }
    );
};


exports.getPlaylistByCourse = (req, res) => {

    const { course_id } = req.params;

    db.query(
        "SELECT * FROM playlists WHERE course_id=? ORDER BY order_no ASC",
        [course_id],
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

exports.updatePlaylist = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        order_no
    } = req.body;


    const user_id = req.user.id;
    const role = req.user.role;


    const updateData = () => {

        db.query(
            "UPDATE playlists SET title=?, description=?, order_no=? WHERE playlist_id=?",
            [
                title,
                description,
                order_no,
                id
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if(result.affectedRows===0){
                    return res.status(404).json({
                        message:"Playlist Not Found"
                    });
                }


                return res.status(200).json({
                    message:"Playlist Updated Successfully"
                });

            }
        );

    };


    if(role==="teacher"){

        db.query(
            "SELECT * FROM playlists WHERE playlist_id=? AND created_by=?",
            [id,user_id],
            (err,result)=>{

                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }


                if(result.length===0){
                    return res.status(403).json({
                        message:"You cannot update this playlist"
                    });
                }


                updateData();

            }
        );


    } 
    else if(role==="admin"){

        updateData();

    }
    else{

        return res.status(403).json({
            message:"Only admin and teacher can update playlist"
        });

    }

};

exports.deletePlaylist = (req, res) => {

    const { id } = req.params;

    const user_id = req.user.id;
    const role = req.user.role;


    const deleteData = () => {

        db.query(
            "DELETE FROM playlists WHERE playlist_id=?",
            [id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Playlist Not Found"
                    });
                }


                return res.status(200).json({
                    message: "Playlist Deleted Successfully"
                });

            }
        );

    };


    if (role === "teacher") {

        db.query(
            "SELECT * FROM playlists WHERE playlist_id=? AND created_by=?",
            [id, user_id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.length === 0) {
                    return res.status(403).json({
                        message: "You cannot delete this playlist"
                    });
                }


                deleteData();

            }
        );


    } else if (role === "admin") {

        deleteData();

    } else {

        return res.status(403).json({
            message: "Only admin and teacher can delete playlist"
        });

    }

};