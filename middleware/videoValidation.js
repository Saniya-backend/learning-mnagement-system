exports.videoValidation = (req, res, next) => {
  const { playlist_id, title, video_url, duration } = req.body;

  const missingFields = [];

  if (!playlist_id) missingFields.push("playlist_id");
  if (!title) missingFields.push("title");
  if (!video_url) missingFields.push("video_url");
  if (!duration) missingFields.push("duration");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} fields are required`,
    });
  }
 if (isNaN(Number(duration)) || Number(duration) < 60 || Number(duration) > 14400) {
    return res.status(400).json({
        message:"Video duration must be between 1 minute and 4 hours"
    });
}

  next();
};
