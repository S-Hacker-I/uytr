const express = require('express');
const youtubedl = require('youtube-dl-exec');
const path = require('path');
const sanitizeFilename = require('sanitize-filename');
const stream = require('stream');
const util = require('util');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Convert callback-based functions to promise-based
const pipeline = util.promisify(stream.pipeline);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/download', async (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).send('No URL provided');
    }

    try {
        console.log(`Starting download for URL: ${videoUrl}`);

        // Step 1: Fetch video metadata to get the title
        const videoInfo = await youtubedl(videoUrl, {
            dumpSingleJson: true,
        });

        if (!videoInfo || !videoInfo.title) {
            throw new Error('Unable to retrieve video information.');
        }

        // Step 2: Sanitize and construct the filename
        const title = sanitizeFilename(videoInfo.title);
        const tempFileName = 'temp_video.mp4'; // Temporary filename for the download
        const finalFileName = `${title}.mp4`; // Final filename

        // Step 3: Stream the video directly to the user
        res.setHeader('Content-Disposition', `attachment; filename="${finalFileName}"`);
        res.setHeader('Content-Type', 'video/mp4');

        const downloadStream = youtubedl(videoUrl, {
            format: 'bestvideo+bestaudio/best',
            output: '-',
            mergeOutputFormat: 'mp4',
        });

        await pipeline(downloadStream, res);

    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).send(`Error downloading video: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});