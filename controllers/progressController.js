const db = require("../config/db");

exports.markVideoComplete = (req, res) => {
  const user_id = req.user.id;
  const { course_id, video_id } = req.body;

  db.query(
    "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
    [user_id, course_id],
    (err, enrollResult) => {
     if (err) {
    console.log(err);
    return res.status(500).json({ message: "Database error" });
}
      if (enrollResult.length === 0) {
        return res
          .status(403)
          .json({ message: "You are not enrolled in this course" });
      }

      db.query(
        `SELECT v.video_id
                 FROM videos v
                 JOIN playlists p ON v.playlist_id = p.playlist_id
                 WHERE v.video_id=? AND p.course_id=?`,
        [video_id, course_id],
        (errVideo, videoResult) => {
          if (errVideo)
            return res.status(500).json({ message: "Database error" });

          if (videoResult.length === 0) {
            return res
              .status(400)
              .json({ message: "Invalid video for this course" });
          }

          db.query(
            "SELECT * FROM progress WHERE user_id=? AND video_id=?",
            [user_id, video_id],
            (err2, progressResult) => {
              if (err2)
                return res.status(500).json({ message: "Database error" });

              if (progressResult.length > 0) {
                return res
                  .status(400)
                  .json({ message: "Video already completed" });
              }

              db.query(
                "INSERT INTO progress (user_id, course_id, video_id, completed) VALUES (?, ?, ?, true)",
                [user_id, course_id, video_id],
                (err3) => {
                  if (err3)
                    return res
                      .status(500)
                      .json({ message: "Error saving progress" });

                  res
                    .status(201)
                    .json({ message: "Video marked as completed" });
                },
              );
            },
          );
        },
      );
    },
  );
};

exports.getCourseProgress = (req, res) => {
  const user_id = req.user.id;
  const { course_id} = req.params;

  db.query(
    "SELECT * FROM enrollments WHERE user_id=? AND course_id=?",
    [user_id, course_id],
    (err, enrollResult) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (enrollResult.length === 0) {
        return res .status(403)
          .json({ message: "You are not enrolled in this course" });
      }

      db.query(
        `SELECT COUNT(*) AS totalVideos
                 FROM videos v
                 JOIN playlists p ON v.playlist_id = p.playlist_id
                 WHERE p.course_id=?`,
        [course_id],
        (err2, totalResult) => {
          if (err2) return res.status(500).json({ message: "Database error" });

          const totalVideos = totalResult[0].totalVideos;
           if(totalVideos === 0){
   return res.json({
      message:"No videos available in this course",
      totalVideos:0,
      completedVideos:0,
      percentage:0
   });
}
          db.query(
            "SELECT COUNT(*) AS completedVideos FROM progress WHERE user_id=? AND course_id=? AND completed=true",
            [user_id, course_id],
            (err3, completedResult) => {
              if (err3)
                return res.status(500).json({ message: "Database error" });

              const completedVideos = completedResult[0].completedVideos;

              const percentage =
                totalVideos > 0
                  ? Math.round((completedVideos / totalVideos) * 100)
                  : 0;

              res.json({
                totalVideos,
                completedVideos,
                percentage,
              });
            },
          );
        },
      );
    },
  );
};
