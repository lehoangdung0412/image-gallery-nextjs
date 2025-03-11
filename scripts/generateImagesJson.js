const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "../public/images");
const OUTPUT_FILE = path.join(__dirname, "../public/images.json");

function generateImageList() {
    const categories = fs.readdirSync(IMAGES_DIR);
    const imageList = {};

    categories.forEach((category) => {
        const categoryPath = path.join(IMAGES_DIR, category);

        if (fs.statSync(categoryPath).isDirectory()) {
            imageList[category] = fs
                .readdirSync(categoryPath)
                .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
                .map((file) => `/images/${category}/${file}`);
        }
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageList, null, 2));
    console.log(`✅ Generated images.json with ${Object.keys(imageList).length} categories.`);
}

generateImageList();
