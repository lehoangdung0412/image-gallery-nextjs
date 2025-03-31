const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "../public/images");
const VIDEOS_DIR = path.join(__dirname, "../public/videos");
const IMAGES_OUTPUT_FILE = path.join(__dirname, "../public/images.json");
const VIDEOS_OUTPUT_FILE = path.join(__dirname, "../public/videos.json");

function generateImageList() {
    const categories = fs.readdirSync(IMAGES_DIR);
    const imageList = {};

    categories.forEach((category) => {
        const categoryPath = path.join(IMAGES_DIR, category);

        if (fs.statSync(categoryPath).isDirectory()) {
            const subDirPath = path.join(categoryPath, "thumbnails");

            if (fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory()) {
                const files = fs.readdirSync(subDirPath);

                const imageFiles = files
                    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                    .map((file) => `/images/${category}/thumbnails/${file}`);

                if (imageFiles.length > 0) {
                    imageList[category] = imageList[category] || [];
                    imageList[category] = imageList[category].concat(imageFiles);
                }
            }
        }
    });

    fs.writeFileSync(IMAGES_OUTPUT_FILE, JSON.stringify(imageList, null, 2));
    console.log(`✅ Generated images.json with ${Object.keys(imageList).length} categories.`);
}

function generateVideoList() {
    const categories = fs.readdirSync(VIDEOS_DIR);
    const videoList = {};

    categories.forEach((category) => {
        const categoryPath = path.join(VIDEOS_DIR, category);

        if (fs.statSync(categoryPath).isDirectory()) {
            const subDirPath = path.join(categoryPath, "thumbnails");

            if (fs.existsSync(subDirPath) && fs.statSync(subDirPath).isDirectory()) {
                const files = fs.readdirSync(subDirPath);

                const videoFiles = files
                    .filter((file) => /\.(mp4|MP4|mov)$/i.test(file))
                    .map((file) => `/videos/${category}/thumbnails/${file}`);

                if (videoFiles.length > 0) {
                    videoList[category] = videoList[category] || [];
                    videoList[category] = videoList[category].concat(videoFiles);
                }
            }
        }
    });

    fs.writeFileSync(VIDEOS_OUTPUT_FILE, JSON.stringify(videoList, null, 2));
    console.log(`✅ Generated videos.json with ${Object.keys(videoList).length} categories.`);
}

generateImageList();
generateVideoList();
