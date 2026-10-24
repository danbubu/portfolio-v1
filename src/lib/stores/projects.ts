import { writable } from 'svelte/store';

export interface Project {
	id: string;
	title: string;
	tagline: string;
	link: string;
	techStack: string;
	description: string;
	metrics?: string;
	status: 'Live' | 'Building' | 'Archived' | 'In build';
	category: string;
	previews: string[];
	inspiration: string;
	engineeringApproach: string;
	addedAt?: Date;
}

export function techChips(project: Project): string[] {
	return project.techStack
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
}

export function projectPreviews(project: Project): string[] {
	return (project.previews ?? []).filter(Boolean);
}

/**
 * Kept for the admin form. The public site reads src/lib/content/work.ts.
 * Copy here matches the dossier so this file cannot drift back to retired claims.
 */
export const projects = writable<Project[]>([
	{
		id: '1',
		title: 'Airdrop Tracker',
		tagline: 'Archived crypto airdrop tracker',
		link: 'https://airdroptracker.app',
		techStack: 'React, Tailwind CSS, Firebase Auth, Firestore rules, Web3.js',
		description:
			"A tracker for crypto airdrop hunters with real-time sync, streaks, levels and a premium tier. I built it full-stack. It once had 140+ active users; airdrops stopped being relevant and I've since retired it.",
		metrics: 'Once had 140+ active users',
		status: 'Archived',
		category: 'DeFi · Archived',
		previews: [
			'/images/projects/airdrop-tracker1.webp',
			'/images/projects/airdrop-tracker2.webp'
		],
		inspiration:
			'Crypto tools often punish people with wallet gymnastics. I wanted subscribing to feel like any other app.',
		engineeringApproach:
			'Hid a messy multi-wallet surface behind one payment layer, so people could subscribe without thinking about protocols.'
	},
	{
		id: '2',
		title: 'Intervue AI',
		tagline: 'Live voice mock interviews',
		link: 'https://intervue-ai-gilt.vercel.app/',
		techStack: 'Next.js 15, React 19, TypeScript, Supabase, Vapi, DeepSeek, Playwright',
		description:
			'Live voice mock interviews for Ghanaian students heading into NSS and internship interviews. If the main voice provider fails mid-interview, a circuit breaker switches to a three-service fallback without ending the session. My final-year project at KNUST: I designed and built the product, and my project partner Winifred Anokye researched the company data.',
		metrics: '84 unit tests · 6 e2e specs',
		status: 'Live',
		category: 'EdTech',
		previews: ['/images/projects/intervue-ai1.webp', '/images/projects/intervue-ai2.webp'],
		inspiration:
			'Ghanaian students go into NSS and internship interviews with almost no spoken practice. Coaches cost money, peers are hard to schedule, and typed chat misses panel pressure.',
		engineeringApproach:
			'Designed for the failure first. Our voice vendor\'s wallet ran out mid-interview more than once, so I built a second voice path (Groq Whisper, DeepSeek, Gepard) behind a circuit breaker, with an admin switch that needs no redeploy. 84 unit tests across 35 suites and six production-build Playwright specs.'
	},
	{
		id: '3',
		title: 'NabbyCare+',
		tagline: 'A private first step',
		link: 'https://nabby-care-7ymj.vercel.app/',
		techStack: 'Next.js 15, React, Tailwind CSS, Framer Motion, Zustand, Supabase, Prisma',
		description:
			'A private first step for people who suspect something is off. Self-screening on full validated questionnaires, not diagnosis, with a CareMap of your answers and no account needed. The ADHD module is live; others are on the way.',
		metrics: 'Privacy-first',
		status: 'Live',
		category: 'Health',
		previews: ['/images/projects/nabby-care1.webp', '/images/projects/nabby-care2.webp'],
		inspiration:
			'People often need a private first step before they talk to anyone else. NabbyCare+ keeps that step calm, and it never pretends to be a diagnosis.',
		engineeringApproach:
			'Kept the questionnaire wording intact, drew a CareMap of the answers, and refused a "positive screen" label. A crisis interrupt sits on PHQ-9 item 9.'
	},
	{
		id: '4',
		title: 'The Control Room',
		tagline: 'Invite-only FIFA tournaments',
		link: 'https://thecontrolroom.vercel.app/',
		techStack: 'Next.js 14, Supabase Realtime, shadcn/ui, Tailwind CSS',
		description:
			'An invite-only FIFA tournament platform for alumni communities, co-founded with Nii Omanye Harding. Google sign-in, team selection with locks, admin checks on offline payments, a live league table and a Hall of Fame.',
		metrics: 'Invite-only',
		status: 'Live',
		category: 'Esports',
		previews: [
			'/images/projects/the-control-room1.webp',
			'/images/projects/the-control-room2.webp'
		],
		inspiration:
			'Tournament arguments usually start from messy records. We wanted match history nobody could dispute.',
		engineeringApproach:
			'Every score writes through one strict path, so nobody settles the bracket in the group chat.'
	}
]);

export const activeProjectIndex = writable(0);
