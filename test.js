const fs = require('fs');
console.log("Running test script...");
try {
    fs.mkdirSync('test_folder');
    console.log("Created test_folder");
} catch (e) {
    console.error("Error creating folder:", e);
}
