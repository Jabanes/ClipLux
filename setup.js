const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("Starting setup...");

// Create dirs
if (!fs.existsSync('public')) fs.mkdirSync('public');
if (!fs.existsSync('public/frames')) fs.mkdirSync('public/frames');

// Copy files
const srcDir = path.join(__dirname, 'assets', 'frames');
const destDir = path.join(__dirname, 'public', 'frames');

console.log(`Copying from ${srcDir} to ${destDir}`);

if (fs.existsSync(srcDir)) {
    const files = fs.readdirSync(srcDir);
    let count = 0;
    files.forEach(file => {
        if (file.endsWith('.jpg') || file.endsWith('.webp')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
            count++;
        }
    });
    console.log(`Copied ${count} frames.`);
} else {
    console.log("Assets dir not found!");
}

// Install
console.log("Installing...");
try {
    execSync('npm install', { stdio: 'inherit', shell: true });
} catch (e) {
    console.error("Install failed");
}

// Build
console.log("Building...");
try {
    execSync('npm run build', { stdio: 'inherit', shell: true });
} catch (e) {
    console.error("Build failed");
}
