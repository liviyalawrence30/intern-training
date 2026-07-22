const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

async function fileOperations() {
  try {
    // Write
    await fs.writeFile(filePath, 'Line 1 — written by Node.js');
    console.log('File written');

    // Read
    const content = await fs.readFile(filePath, 'utf8');
    console.log('Content:', content);

    // Append
    await fs.appendFile(filePath, '\nLine 2 — appended');
    await fs.appendFile(filePath, '\nLine 3 — appended again');

    // Read again
    const updated = await fs.readFile(filePath, 'utf8');
    console.log('Updated:\n', updated);
  } catch (err) {
    console.error('Error:', err);
  }
}

fileOperations();