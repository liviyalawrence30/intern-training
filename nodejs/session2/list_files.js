const fs = require('fs');
const path = require('path');

const folderPath = __dirname;

const files = fs.readdirSync(folderPath);

files.forEach(file => {
  if (path.extname(file) === '.js') {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    console.log(`${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  }
});