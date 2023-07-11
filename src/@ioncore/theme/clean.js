// Clean all files in this repository recursively that matches the given pattern.
// This uses only native node.js modules, so it should be compatible with all
const patterns = [
  /\.js$/,
  /\.d.ts$/,
]

const fs = require("fs");
const path = require("path");

function clean(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    // Make sure we don't delete the clean script
    if (filePath === __filename) {
      continue;
    }
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      clean(filePath);
    } else if (stat.isFile()) {
      let shouldDelete = false;
      for (const pattern of patterns) {
        if (pattern.test(filePath)) {
          shouldDelete = true;
          break;
        }
      }
      if (shouldDelete) {
        console.log("Deleting", filePath);
        fs.unlinkSync(filePath);
      }
    }
  }
}

clean(__dirname);