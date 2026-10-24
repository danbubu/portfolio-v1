import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('static');

async function writeVariants(input, outBase, widths) {
	const image = sharp(input, { failOn: 'none' }).rotate();
	const meta = await image.metadata();
	for (const width of widths) {
		const height = Math.round((meta.height / meta.width) * width);
		const pipeline = sharp(input, { failOn: 'none' }).rotate().resize({ width, withoutEnlargement: true });
		await pipeline.clone().webp({ quality: 72, alphaQuality: 80, effort: 5 }).toFile(`${outBase}-${width}.webp`);
		await pipeline.clone().avif({ quality: 48, effort: 5 }).toFile(`${outBase}-${width}.avif`);
		console.log(outBase, width, 'x', height);
	}
}

await writeVariants(
	path.join(root, 'images/profile-cutout.png'),
	path.join(root, 'images/profile-cutout'),
	[480, 960]
);

await sharp(path.join(root, 'images/profile-cutout.png'))
	.rotate()
	.resize({ width: 960, withoutEnlargement: true })
	.png({ compressionLevel: 9, palette: true, quality: 70, effort: 10 })
	.toFile(path.join(root, 'images/profile-cutout.optimized.png'));

const heavy = [
	['images/projects/airdrop-tracker2.png', 1200],
	['images/projects/intervue-ai1.png', 1200],
	['images/projects/nabby-care1.png', 1200],
	['images/tema-map.png', 800]
];

for (const [rel, width] of heavy) {
	const input = path.join(root, rel);
	const output = input.replace(/\.png$/, '.webp');
	await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 70 }).toFile(output);
	console.log('webp', output);
}

const og = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#050505"/>
  <rect x="0" y="0" width="12" height="630" fill="#2563EB"/>
  <rect x="12" y="0" width="6" height="630" fill="#F5C518"/>
  <rect x="18" y="0" width="6" height="630" fill="#1B8A4A"/>
  <text x="88" y="250" fill="#EDEDED" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="700">Daniel Mawuena</text>
  <text x="88" y="340" fill="#93C5FD" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="600">Full-Stack Developer &amp; QA Engineer</text>
  <text x="88" y="430" fill="#A1A1AA" font-family="Inter, Arial, sans-serif" font-size="32">Tema, Ghana · Open to remote roles</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile(path.join(root, 'og.png'));

const icon = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#050505"/>
  <text x="90" y="112" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#3b82f6">DM</text>
</svg>`);

await sharp(icon).resize(180, 180).png().toFile(path.join(root, 'apple-touch-icon.png'));

const png32 = await sharp(icon).resize(32, 32).png().toBuffer();
const ico = pngToIco(png32);
await writeFile(path.join(root, 'favicon.ico'), ico);
console.log('icons and og written');

function pngToIco(png) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(1, 4);
	const entry = Buffer.alloc(16);
	entry.writeUInt8(32, 0);
	entry.writeUInt8(32, 1);
	entry.writeUInt8(0, 2);
	entry.writeUInt8(0, 3);
	entry.writeUInt16LE(1, 4);
	entry.writeUInt16LE(32, 6);
	entry.writeUInt32LE(png.length, 8);
	entry.writeUInt32LE(6 + 16, 12);
	return Buffer.concat([header, entry, png]);
}
