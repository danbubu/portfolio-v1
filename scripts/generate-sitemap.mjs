import { writeFileSync } from 'node:fs';

const origin = 'https://danielmawuena.me';
const lastmod = new Date().toISOString().slice(0, 10);
const paths = [
	'/',
	'/cv/',
	'/work/intervue-ai/',
	'/work/nabbycare/',
	'/work/the-control-room/',
	'/work/wondez-barber/'
];

const urls = paths
	.map(
		(pathname) => `  <url>
    <loc>${origin}${pathname}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
	)
	.join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(new URL('../static/sitemap.xml', import.meta.url), xml);
console.log(`sitemap ${lastmod} (${paths.length} urls)`);
