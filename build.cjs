const fs = require('fs-extra');
const path = require('path');

// Copy manifest
fs.copySync('manifest.json', 'dist/manifest.json');

// Copy icons
fs.copySync('public', 'dist', {
  filter: (src) => path.extname(src) === '.png'
});