const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

const files = [
  'https://unpkg.com/cornerstone-wado-image-loader@^3/dist/cornerstoneWADOImageLoader.js',
  'https://unpkg.com/cornerstone-core@^2/dist/cornerstone.js',
  'https://unpkg.com/dicom-parser@^1/dist/dicomParser.js',
];

async function downloadFiles(files) {
  for (const file of files) {
    const filename = path.basename(file);
    const res = await fetch(file);
    const text = await res.text();
    const fileto = path.join(__dirname, `../src/_packages/@lunit/insight-viewer/public/${filename}`);
    await fs.mkdirp(path.dirname(fileto));
    await fs.writeFileSync(fileto, text);
  }
}

downloadFiles(files);
