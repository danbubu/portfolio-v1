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
	status: 'Live' | 'Building';
	category: string;
	/**
	 * One or two local screenshots. Desktop shows both side-by-side when length >= 2;
	 * mobile carousels between them. Single-image projects still work cleanly.
	 */
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

/** Normalized preview list (filters empties). */
export function projectPreviews(project: Project): string[] {
	return (project.previews ?? []).filter(Boolean);
}

export const projects = writable<Project[]>([
	{
		id: '1',
		title: 'Airdrop Tracker',
		tagline: 'The UX Architect',
		link: 'https://airdroptracker.app',
		techStack: 'React, Blockchain Integration, Payment Gateways, Tailwind CSS',
		description:
			'Full-stack crypto tracking that abstracts multi-wallet complexity into a calm payment and subscription experience.',
		metrics: '140+ Active Users',
		status: 'Live',
		category: 'DeFi',
		previews: [
			'/images/projects/airdrop-tracker1.png',
			'/images/projects/airdrop-tracker2.png'
		],
		inspiration:
			'Crypto tools too often punish users with wallet gymnastics. I wanted a tracker that makes multi-protocol payments feel obvious — so people can focus on opportunity, not plumbing.',
		engineeringApproach:
			'Unified a messy multi-wallet surface behind one payment abstraction layer, trading some protocol-specific control for a stress-free, subscription-ready UX.'
	},
	{
		id: '2',
		title: 'Intervue-AI',
		tagline: 'Mock interviews that actually prepare you',
		link: 'https://intervue-ai-gilt.vercel.app/',
		techStack: 'React, TypeScript, AI Scoring, Tailwind CSS',
		description:
			'A rigorous mock-interview simulator built to KNUST academic standard — practice aloud, get scored in real time, and know what to sharpen before NSS or internship interviews count.',
		metrics: 'KNUST-ready',
		status: 'Live',
		category: 'EdTech',
		previews: [
			'/images/projects/intervue-ai1.png',
			'/images/projects/intervue-ai2.png'
		],
		inspiration:
			'Campus interviews reward composure under pressure, but most prep is silent reading. I built a space to rehearse out loud and get honest, structured feedback before the stakes are real.',
		engineeringApproach:
			'Centered the product on a live scoring loop: capture spoken answers, evaluate against academic rubrics in real time, and surface gaps immediately instead of after the fact.'
	},
	{
		id: '3',
		title: 'NabbyCare+',
		tagline: 'A first conversation with yourself',
		link: 'https://nabby-care-7ymj.vercel.app/',
		techStack: 'React, Clinical Screening Instruments, Visualization, Tailwind CSS',
		description:
			'Private mental-health self-screening built on clinically validated instruments. Not diagnostic — clear feedback plus a visual CareMap of your responses.',
		metrics: 'Privacy-first',
		status: 'Live',
		category: 'Health',
		previews: [
			'/images/projects/nabby-care1.png',
			'/images/projects/nabby-care2.png'
		],
		inspiration:
			'People often need a private, non-judgmental first step before seeking help. NabbyCare+ makes that step feel calm, clear, and human — never like a clinical verdict.',
		engineeringApproach:
			'Kept validated screening instruments intact while wrapping them in a CareMap visualization that turns dense responses into something you can actually reflect on.'
	},
	{
		id: '4',
		title: 'The Control Room',
		tagline: 'Precision. Legacy. Order.',
		link: 'https://thecontrolroom.vercel.app/',
		techStack: 'React, Tournament Engine, Realtime State, Tailwind CSS',
		description:
			'Invite-only esports tournament management — match results, scores, and championship history with zero tolerance for disputed records.',
		metrics: 'Invite-only',
		status: 'Live',
		category: 'Esports',
		previews: [
			'/images/projects/the-control-room1.png',
			'/images/projects/the-control-room2.png'
		],
		inspiration:
			'Tournament drama usually comes from messy records. I wanted a system-protocol tool that treats match history as sacred — precise, ordered, and beyond dispute.',
		engineeringApproach:
			'Designed around an authoritative results ledger: every score and championship event writes through a strict record path so the bracket’s truth never depends on chat arguments.'
	}
]);

/** Shared index so Builder showcase + Thinker reflections stay in sync */
export const activeProjectIndex = writable(0);
