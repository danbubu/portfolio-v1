import { writeFileSync } from 'node:fs';

const lastmod = '2026-10-24';
const urls = [
	'https://danielmawuena.me/',
	'https://danielmawuena.me/cv/',
	'https://danielmawuena.me/work/intervue-ai/',
	'https://danielmawuena.me/work/nabbycare/',
	'https://danielmawuena.me/work/the-control-room/',
	'https://danielmawuena.me/work/wondez-barber/'
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>
`;

writeFileSync(new URL('../static/sitemap.xml', import.meta.url), body);
console.log(`sitemap.xml: ${urls.length} urls, lastmod ${lastmod}`);
