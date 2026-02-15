const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'copy_log.txt');
function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
}

log("Starting copy script...");
log(`CWD: ${process.cwd()}`);

const src = path.join(__dirname, 'assets', 'frames');
const dest = path.join(__dirname, 'public', 'frames');

log(`Src: ${src}`);
log(`Dest: ${dest}`);

if (!fs.existsSync(src)) {
    log("Source does not exist!");
    process.exit(1);
}

if (!fs.existsSync(dest)) {
    log("Dest does not exist, creating...");
    try {
        fs.mkdirSync(dest, { recursive: true });
        log("Created dest dir.");
    } catch (e) {
        log(`Failed to create dest: ${e.message}`);
        process.exit(1);
    }
}

try {
    const files = fs.readdirSync(src);
    log(`Found ${files.length} files in source.`);
    files.forEach(file => {
        try {
            fs.copyFileSync(path.join(src, file), path.join(dest, file));
        } catch (e) {
            log(`Failed to copy ${file}: ${e.message}`);
        }
    });
    log("Copy complete.");
    const destFiles = fs.readdirSync(dest);
    log(`Dest now has ${destFiles.length} files.`);
} catch (e) {
    log(`Error during copy: ${e.message}`);
}
