const db = require("../config/db");

exports.createVideo = (req, res) => {

    const {
          playlist_id,
        title,
        description,video_url,duration,
        order_no
    } = req.body;

    const created_by = req.user.id;
    const role = req.user.role;


    const insertVideos= () => {

        db.query(
            `INSERT INTO videos 
            (playlist_id, title, description, video_url,duration,order_no,created_by )
            VALUES (?, ?, ?, ?, ?,?,?)`,
            [
                playlist_id,
                title,
                description,
                video_url,
                duration,
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
                    message: "Video Created Successfully",
                    video_id: result.insertId
                });

            }
        );

    };


    if (role === "teacher") {

      db.query(
`
SELECT p.playlist_id
FROM playlists p
JOIN courses c
ON p.course_id = c.course_id
JOIN teachers t on c.teacher_id=t.teacher_id
WHERE p.playlist_id=?  
AND t.user_id=?
`,
[playlist_id, created_by],
(err,result)=>{

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.length === 0) {
                    return res.status(403).json({
                        message: "You cannot add video on this playlist"
                    });
                }


                insertVideos();

            }
        );


    } else if (role === "admin") {

        insertVideos();

    } else {

        return res.status(403).json({
            message:"Only admin and teacher can create video"
        });

    } 

};

exports.getAllVideos= (req, res) => {

    db.query(
        "SELECT * FROM videos ORDER BY playlist_id, order_no ASC",
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


exports.getVideoByPlaylist = (req, res) => {

    const { playlist_id } = req.params;

    db.query(
        "SELECT * FROM videos  WHERE playlist_id=? ORDER BY order_no ASC",
        [playlist_id],
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

exports.updateVideo= (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        video_url,
        duration,
        order_no
    } = req.body;


    const user_id = req.user.id;
    const role = req.user.role;


    const updateData = () => {

        db.query(
            "UPDATE videos SET title=?, description=?,video_url=?,duration=? ,order_no=? WHERE video_id=?",
            [
                title,
                description,
                video_url,
                duration,
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
                        message:"Video Not Found"
                    });
                }


                return res.status(200).json({
                    message:"Video  Updated Successfully"
                });

            }
        );

    };


    if(role==="teacher"){

        db.query(
            "SELECT * FROM videos WHERE video_id=? AND created_by=?",
            [id,user_id],
            (err,result)=>{

                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }


                if(result.length===0){
                    return res.status(403).json({
                        message:"You cannot update this video"
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
            message:"Only admin and teacher can update video"
        });

    }

};

exports.deleteVideo= (req, res) => {

    const { id } = req.params;

    const user_id = req.user.id;
    const role = req.user.role;


    const deleteData = () => {

        db.query(
            "DELETE FROM videos WHERE video_id=?",
            [id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Video Not Found"
                    });
                }


                return res.status(200).json({
                    message: "video Deleted Successfully"
                });

            }
        );

    };


    if (role === "teacher") {

        db.query(
            "SELECT * FROM videos  WHERE video_id=? AND created_by=?",
            [id, user_id],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }


                if (result.length === 0) {
                    return res.status(403).json({
                        message: "You cannot delete this video"
                    });
                }


                deleteData();

            }
        );


    } else if (role === "admin") {

        deleteData();

    } else {

        return res.status(403).json({
            message: "Only admin and teacher can delete video"
        });

    }

};