const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'assets', 'frames');
const publicDir = path.join(__dirname, 'public');
const framesDir = path.join(publicDir, 'frames');

console.log("Checking directories...");

if (!fs.existsSync(publicDir)) {
    console.log("Creating public dir...");
    try {
        fs.mkdirSync(publicDir);
    } catch (e) { console.error("Failed to create public:", e); }
}

if (!fs.existsSync(framesDir)) {
    console.log("Creating public/frames dir...");
    try {
        fs.mkdirSync(framesDir);
    } catch (e) { console.error("Failed to create public/frames:", e); }
}

if (fs.existsSync(srcDir)) {
    console.log("Source dir exists. Copying files...");
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        try {
            fs.copyFileSync(path.join(srcDir, file), path.join(framesDir, file));
            console.log(`Copied ${file}`);
        } catch (e) {
            console.error(`Failed to copy ${file}:`, e);
        }
    });
} else {
    console.error("Source assets/frames dir NOT found!");
}
