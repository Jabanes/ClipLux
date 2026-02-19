const fs = require('fs');
const path = require('path');
console.log('DEBUG: Node is executing');
console.log('DEBUG: CWD:', process.cwd());
console.log('DEBUG: __dirname:', __dirname);
try {
    const testDir = path.join(__dirname, 'test_debug_dir');
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir);
        console.log('DEBUG: Created test dir:', testDir);
        fs.rmdirSync(testDir);
        console.log('DEBUG: Removed test dir');
    } else {
        console.log('DEBUG: Test dir already exists');
    }
} catch (e) {
    console.error('DEBUG: FS Error:', e);
}
