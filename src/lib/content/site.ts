/**
 * TODO(Daniel): a /now page and a Substack feed stay off until you want a cadence in public.
 * TODO(Daniel): a Ghana nod (local time, a divider, an Adinkra) stays off until you pick one.
 */

export type PageMeta = {
	title: string;
	description: string;
	/** Shorter share text. Falls back to description. */
	ogDescription?: string;
	canonical: string;
	image: string;
	imageAlt: string;
	jsonLd?: unknown;
};

export const SITE = 'https://danielmawuena.me';
export const OG_IMAGE = `${SITE}/og.png`;
export const OG_ALT = 'Daniel Mawuena, Full-Stack Developer and QA Engineer';

export const HOME_TITLE = 'Daniel Mawuena · Full-Stack Developer & QA Engineer';

export const HOME_DESCRIPTION =
	'Daniel Mawuena, full-stack developer and QA engineer in Tema, Ghana. React, Next.js, SvelteKit, Supabase, Playwright. AWS Certified Cloud Practitioner. Open to remote part-time roles.';

export const HOME_OG_DESCRIPTION =
	'I build web products end to end and test how they break. Intervue AI, NabbyCare+, QA on a banking migration. Based in Tema, Ghana; open to remote part-time roles.';

/** Person schema. LinkedIn is the public profile, not the old /in/danielmawuena slug. */
export const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Daniel Bubu Mawuena',
	alternateName: 'Bubu',
	jobTitle: 'Full-Stack Developer & QA Engineer',
	url: SITE,
	email: 'mailto:danielmawuena75@gmail.com',
	image: OG_IMAGE,
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Tema',
		addressRegion: 'Greater Accra',
		addressCountry: 'GH'
	},
	alumniOf: {
		'@type': 'CollegeOrUniversity',
		name: 'Kwame Nkrumah University of Science and Technology'
	},
	worksFor: { '@type': 'Organization', name: 'RPL Technologies' },
	hasCredential: {
		'@type': 'EducationalOccupationalCredential',
		name: 'AWS Certified Cloud Practitioner',
		dateCreated: '2025-08'
	},
	knowsAbout: [
		'React',
		'Next.js',
		'SvelteKit',
		'TypeScript',
		'Supabase',
		'PostgreSQL',
		'Playwright',
		'QA',
		'LLM integration'
	],
	sameAs: [
		'https://www.linkedin.com/in/daniel-mawuena-833b3331b/',
		'https://github.com/danbubu',
		'https://x.com/thatbubuguy',
		'https://thatbubuguy.substack.com/',
		'https://www.credly.com/users/daniel-mawuena'
	]
};

export const defaultMeta: PageMeta = {
	title: HOME_TITLE,
	description: HOME_DESCRIPTION,
	ogDescription: HOME_OG_DESCRIPTION,
	canonical: `${SITE}/`,
	image: OG_IMAGE,
	imageAlt: OG_ALT,
	jsonLd: personJsonLd
};

export const notFoundMeta: PageMeta = {
	title: 'Page not found · Daniel Mawuena',
	description: 'This page is not on danielmawuena.me.',
	canonical: `${SITE}/`,
	image: OG_IMAGE,
	imageAlt: OG_ALT
};

export const skillGroups: { name: string; items: string[] }[] = [
	{
		name: 'Frontend',
		items: [
			'React',
			'Next.js',
			'SvelteKit',
			'TypeScript',
			'JavaScript',
			'Tailwind CSS',
			'Framer Motion',
			'GSAP',
			'UI/UX design'
		]
	},
	{
		name: 'Backend and data',
		items: ['Node.js', 'Supabase', 'PostgreSQL', 'Firebase', 'REST APIs', 'Zod']
	},
	{
		name: 'AI',
		items: [
			'LLM integration (DeepSeek, Vapi, Groq Whisper)',
			'Prompt engineering',
			'Multi-vendor fallback design'
		]
	},
	{
		name: 'Quality',
		items: [
			'QA',
			'Playwright',
			'Node test runner',
			'Bug reporting',
			'Regression testing on a bank migration'
		]
	},
	{
		name: 'Cloud and tooling',
		items: ['AWS', 'Docker', 'Git', 'GitHub Actions', 'Vercel']
	}
];

export const marqueeTech: { name: string; icon?: string }[] = [
	{ name: 'React', icon: '/images/tech/react.svg' },
	{ name: 'Next.js' },
	{ name: 'TypeScript', icon: '/images/tech/typescript.svg' },
	{ name: 'Node.js', icon: '/images/tech/nodejs.svg' },
	{ name: 'SvelteKit', icon: '/images/tech/svelte.svg' },
	{ name: 'Playwright' },
	{ name: 'Supabase', icon: '/images/tech/supabase.svg' },
	{ name: 'PostgreSQL', icon: '/images/tech/postgresql.svg' },
	{ name: 'Firebase', icon: '/images/tech/firebase.svg' },
	{ name: 'Tailwind', icon: '/images/tech/tailwindcss.svg' },
	{ name: 'AWS', icon: '/images/tech/aws.svg' }
];

export const playlist: { title: string; artist: string }[] = [
	{ title: 'Frens', artist: 'Obongjayar' },
	{ title: 'History', artist: 'Dave, James Blake' },
	{ title: 'For You', artist: 'Kadjha Bonet' },
	{ title: 'I wish it was me', artist: 'Obongjayar' },
	{ title: 'Queen Tings', artist: 'Masego, Tiffany Gouché' },
	{ title: 'Free Mind', artist: 'Tems' },
	{ title: 'Chapter 16', artist: 'Dave, Kano' },
	{ title: 'First in Class', artist: 'Omar Sterling' },
	{ title: 'We dey manage', artist: 'M.anifest' },
	{ title: 'Wonderful Wonder', artist: 'Nathaniel Bassey, Love Song' },
	{ title: 'Disco', artist: 'Surf Curse' }
];
