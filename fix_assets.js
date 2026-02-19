const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'fix_assets.log');
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\r\n');
}

const srcDir = path.join(__dirname, 'assets', 'frames');
const publicDir = path.join(__dirname, 'public');
const framesDir = path.join(publicDir, 'frames');

log("Checking directories at " + new Date().toISOString());
log(`srcDir: ${srcDir}`);
log(`publicDir: ${publicDir}`);
log(`framesDir: ${framesDir}`);

if (!fs.existsSync(publicDir)) {
    log("Creating public dir...");
    try {
        fs.mkdirSync(publicDir);
    } catch (e) { log(`Failed to create public: ${e}`); }
}

if (!fs.existsSync(framesDir)) {
    log("Creating public/frames dir...");
    try {
        fs.mkdirSync(framesDir);
    } catch (e) { log(`Failed to create public/frames: ${e}`); }
} else {
    // Clean existing frames to support removal
    log("Cleaning public/frames dir...");
    try {
        const existingFiles = fs.readdirSync(framesDir);
        existingFiles.forEach(file => {
            fs.unlinkSync(path.join(framesDir, file));
        });
    } catch (e) { log(`Failed to clean public/frames: ${e}`); }
}

if (fs.existsSync(srcDir)) {
    log("Source dir exists. Copying files...");
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        try {
            fs.copyFileSync(path.join(srcDir, file), path.join(framesDir, file));
            log(`Copied ${file}`);
        } catch (e) {
            log(`Failed to copy ${file}: ${e}`);
        }
    });
} else {
    log("Source assets/frames dir NOT found!");
}
