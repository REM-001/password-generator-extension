# Rem-Password Chrome Extension

A secure password generator and manager Chrome extension built with React and TypeScript. Generate strong passwords, save them securely, and access them easily.

## Features

- 🔐 Generate secure passwords
- 📏 Customizable password length
- 🔢 Optional numbers and symbols
- 💾 Save passwords locally
- 📋 Quick copy to clipboard
- 🎨 Clean, modern UI with dark theme
- 🛡️ Secure storage using Chrome's built-in storage API

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons
- Chrome Extension API

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Chrome browser

## Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/rem-password-chrome
cd rem-password-chrome
```

2. Install dependencies
```bash
npm install
```

3. Create required icon files
```bash
# Install Sharp for icon generation
npm install sharp --save-dev

# Create generate-icons.cjs file with this content:
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

# Run icon generation
node generate-icons.cjs
```

4. Build the extension
```bash
npm run build
```

## Loading the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" in the top left
5. Select the `dist` folder from your project directory

## Development

- Start development server:
```bash
npm run dev
```

- Build for production:
```bash
npm run build
```

## Project Structure

```
rem-password-chrome/
├── public/
│   ├── icon.svg
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── manifest.json
├── generate-icons.cjs
├── package.json
└── vite.config.ts
```

## Key Files

### manifest.json
```json
{
  "manifest_version": 3,
  "name": "rem-password-chrome",
  "description": "A password manager extension",
  "version": "1.0",
  "action": {
    "default_popup": "index.html",
    "default_title": "Open rem-password-chrome"
  },
  "permissions": [
    "storage"
  ],
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        manualChunks: undefined
      }
    }
  },
  base: './'
})
```
