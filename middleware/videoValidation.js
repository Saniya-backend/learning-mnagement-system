exports.videoValidation = (req, res, next) => {
    const { playlist_id, title, video_url } = req.body;

    const missingFields = [];

    if (!playlist_id) missingFields.push("playlist_id");
    if (!title) missingFields.push("title");
    if (!video_url) missingFields.push("video_url");

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `${missingFields.join(", ")} fields are required`
        });
    }

    next();
};