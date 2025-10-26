import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all jpg files
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));

console.log(`Found ${files.length} images to optimize...`);

// Optimize each image
Promise.all(
  files.map(async (file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: 'cover',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80, progressive: true })
        .toFile(outputPath);

      const inputSize = fs.statSync(inputPath).size;
      const outputSize = fs.statSync(outputPath).size;
      const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);

      console.log(`✓ ${file}: ${(inputSize / 1024).toFixed(2)}KB → ${(outputSize / 1024).toFixed(2)}KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  })
).then(() => {
  console.log('\nImage optimization complete!');
  console.log('Optimized images are in public/images-optimized/');
});

