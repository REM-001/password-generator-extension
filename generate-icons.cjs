const sharp = require('sharp');

const sizes = [16, 48, 128];

async function generateIcons() {
  for (const size of sizes) {
    await sharp('public/icon.svg')
      .resize(size, size)
      .png()
      .toFile(`public/icon${size}.png`);
  }
}

generateIcons().catch(console.error);