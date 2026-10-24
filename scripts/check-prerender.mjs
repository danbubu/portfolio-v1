import { readFileSync, existsSync, statSync } from 'node:fs';

const html = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');
const failures = [];

function need(condition, message) {
	if (!condition) failures.push(message);
}

need(html.includes('<h1'), 'build/index.html has no <h1');
need(html.includes('Full-Stack Developer'), 'build/index.html is missing the title phrase');
need(html.includes('og:image'), 'build/index.html is missing og:image');
need(html.includes('rel="canonical"'), 'build/index.html is missing canonical');
need(!html.includes('Full Stack Architect'), 'build/index.html still says Full Stack Architect');
need(!html.includes('fonts.googleapis.com'), 'build/index.html still loads Google Fonts');
need(!html.includes('Geist'), 'build/index.html still mentions Geist');
need(existsSync('build/404.html'), 'build/404.html is missing');
need(existsSync('build/og.png'), 'build/og.png is missing');
need(existsSync('build/Daniel_Mawuena_resume.pdf'), 'CV PDF missing from the build');

const hero = 'static/images/profile-cutout-960.webp';
need(existsSync(hero), 'hero webp missing');
if (existsSync(hero)) {
	const bytes = statSync(hero).size;
	need(bytes < 200 * 1024, `hero image is ${bytes} bytes`);
}

if (failures.length) {
	console.error(failures.map((line) => `- ${line}`).join('\n'));
	process.exit(1);
}

console.log(`prerender ok (${html.length} bytes in index.html)`);
