import { writable } from 'svelte/store';

export interface Project {
	id: string;
	title: string;
	/** Short positioning line shown under the title */
	tagline: string;
	link: string;
	/** Comma-separated string kept for admin form compatibility */
	techStack: string;
	description: string;
	metrics?: string;
	status: 'Live' | 'Building' | 'Archived' | 'In build';
	category: string;
	/**
	 * One or two local screenshots. Desktop shows both side-by-side when length >= 2;
	 * mobile carousels between them. Single-image projects still work cleanly.
	 */
	previews: string[];
	inspiration: string;
	engineeringApproach: string;
	caseStudy?: string;
	role?: string;
	proof?: string;
	credit?: string;
	reportTicks?: string[];
	reportNotes?: string[];
	addedAt?: Date;
}

export function techChips(project: Project): string[] {
	return project.techStack
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
}

/** Normalized preview list (filters empties). */
export function projectPreviews(project: Project): string[] {
	return (project.previews ?? []).filter(Boolean);
}

// TODO(Daniel): airdroptracker.app still responds. Drop `link` if the archived demo should not be public.
export const projects = writable<Project[]>([
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
		role: 'Final-year project, KNUST',
		proof: '84 unit tests · 6 production-build Playwright specs · about 50 students in informal pilots',
		credit:
			'I designed and built the product. My project partner, Winifred Anokye, researched the company data.',
		caseStudy: 'intervue-ai',
		reportTicks: ['84/84 unit', '6/6 e2e'],
		reportNotes: ['Playwright', 'thesis freeze, Aug 2026'],
		previews: ['/images/projects/intervue-ai1.webp', '/images/projects/intervue-ai2.png'],
		inspiration:
			'Ghanaian students go into NSS and internship interviews with almost no spoken practice. Coaches cost money, peers are hard to schedule, and typed chat misses panel pressure.',
		engineeringApproach:
			'Designed for the failure first. Our voice vendor\'s wallet ran out mid-interview more than once, so I built a second voice path (Groq Whisper, DeepSeek, Gepard) behind a circuit breaker, with an admin switch that needs no redeploy. 84 unit tests across 35 suites and six production-build Playwright specs.'
	},
	{
		id: '3',
		title: 'NabbyCare+',
		tagline: 'A private first step, not a diagnosis',
		link: 'https://nabby-care-7ymj.vercel.app/',
		techStack: 'Next.js 15, React, Tailwind CSS, Framer Motion, Zustand, Supabase, Prisma',
		description:
			'A private first step for people who suspect something is off. Self-screening on full validated questionnaires, not diagnosis, with a CareMap of your answers and no account needed. The ADHD module is live; others are on the way.',
		metrics: 'Privacy-first',
		status: 'Live',
		category: 'Health',
		role: 'Builder',
		proof: 'Crisis interrupt on PHQ-9 item 9. Results in warm bands, never a positive-screen label.',
		caseStudy: 'nabbycare',
		previews: ['/images/projects/nabby-care1.webp', '/images/projects/nabby-care2.png'],
		inspiration:
			'People often need a private, non-judgmental first step before seeking help. NabbyCare+ keeps that step calm and clear, and it does not hand out a diagnosis.',
		engineeringApproach:
			'Kept validated question wording intact and wrapped the answers in a CareMap. Results use warm bands. An immediate crisis interrupt sits on PHQ-9 item 9.'
	},
	{
		id: '4',
		title: 'The Control Room',
		tagline: 'FIFA tournaments for alumni communities',
		link: 'https://thecontrolroom.vercel.app/',
		techStack: 'Next.js 14, Supabase Realtime, shadcn/ui, Tailwind CSS',
		description:
			'An invite-only FIFA tournament platform for alumni communities, co-founded with Nii Omanye Harding. Google sign-in, team selection with locks, admin checks on offline payments, a live league table and a Hall of Fame.',
		metrics: 'Invite-only',
		status: 'Live',
		category: 'Esports',
		role: 'Co-founder with Nii Omanye Harding',
		proof: 'Every score writes through one strict path, so nobody settles the bracket in the group chat.',
		caseStudy: 'the-control-room',
		previews: ['/images/projects/the-control-room1.png', '/images/projects/the-control-room2.png'],
		inspiration:
			'Tournament arguments usually start from messy records. We wanted match history nobody could dispute.',
		engineeringApproach:
			'Every score writes through one strict path, so nobody settles the bracket in the group chat.'
	},
	{
		id: '1',
		title: 'Airdrop Tracker',
		tagline: 'Archived crypto airdrop tracker',
		link: 'https://airdroptracker.app',
		techStack: 'React, Tailwind CSS, Firebase Auth, Firestore rules, Web3.js',
		description:
			'A tracker for crypto airdrop hunters with real-time sync, streaks, levels and a premium tier. I built it full-stack. It once had 140+ active users; airdrops stopped being relevant and I have since retired it.',
		metrics: 'Once had 140+ active users',
		status: 'Archived',
		category: 'DeFi · Archived',
		role: 'Built it full-stack',
		previews: ['/images/projects/airdrop-tracker1.png', '/images/projects/airdrop-tracker2.webp'],
		inspiration:
			'Crypto tools often punish people with wallet gymnastics. I wanted subscribing to feel like any other app.',
		engineeringApproach:
			'Hid a messy multi-wallet surface behind one payment layer, so people could subscribe without thinking about protocols.'
	}
]);

/** Shared index so Builder showcase + Thinker reflections stay in sync */
export const activeProjectIndex = writable(0);
