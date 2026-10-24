import { OG_ALT, OG_IMAGE, SITE, type PageMeta } from '$lib/content/site';

/**
 * TODO(Daniel): keep https://airdroptracker.app only if you still want it as a demo.
 * It responded on 24 Oct 2026, so the link stays.
 * TODO(Daniel): which parts of The Control Room you built versus Nii Omanye Harding.
 * Tournament and player counts are not recorded.
 * TODO(Daniel): NabbyCare+ user numbers, AI provider, and audience are unconfirmed.
 * Do not name a provider.
 * TODO(Daniel): confirm Wondez is happy to be named publicly. The name is in the
 * approved brief, so it is on the page until you say otherwise.
 * TODO(Daniel): confirm the team-of-8 grade before quoting one. It stays off the site.
 */

export type WorkLink = { label: string; href: string };

export type Preview = { src: string; width: number; height: number; alt: string };

export type CaseStudy = {
	slug: string;
	title: string;
	status: string;
	role: string;
	team: string;
	stack: string[];
	dates: string;
	summary: string;
	proof: string;
	credit?: string;
	report?: { text: string; detail: string };
	links: WorkLink[];
	preview?: Preview;
	forWhom: string;
	whatBroke: string;
	decisions: string[];
	proofPoints: string[];
	limits: string[];
	next: string;
	closing?: string;
};

const live = (label: string, href: string): WorkLink => ({ label, href });

export const caseStudies: CaseStudy[] = [
	{
		slug: 'intervue-ai',
		title: 'Intervue AI',
		status: 'Live',
		role: 'Final-year project, KNUST',
		team: 'Daniel Mawuena and Winifred Anokye',
		stack: [
			'Next.js 15',
			'React 19',
			'TypeScript',
			'Supabase',
			'Vapi',
			'DeepSeek',
			'Playwright'
		],
		dates: 'May to August 2026 (thesis frozen)',
		summary:
			'Live voice mock interviews for Ghanaian students heading into NSS and internship interviews, drawing on a library of 51 Ghanaian employers and how they interview.',
		proof:
			'84 unit tests · 6 production-build Playwright specs · about 50 students in informal pilots',
		credit:
			'I designed and built the product. My project partner, Winifred Anokye, researched the company data.',
		report: {
			text: 'Intervue AI · 84/84 unit · 6/6 e2e · Playwright',
			detail: 'at thesis freeze, Aug 2026'
		},
		links: [
			live('Visit Intervue AI', 'https://intervue-ai-gilt.vercel.app/'),
			{ label: 'Read the Intervue AI case study', href: '/work/intervue-ai/' }
		],
		preview: {
			src: '/images/projects/intervue-ai1.webp',
			width: 1200,
			height: 581,
			alt: 'Intervue AI mock interview screen'
		},
		forWhom:
			'A final-year student with an NSS interview next week and nobody to practise with out loud.',
		whatBroke:
			"Our voice vendor's wallet ran out mid-interview more than once, and students' interviews died mid-sentence.",
		decisions: [
			'A second voice path from three services (Groq Whisper for speech-to-text, DeepSeek for dialogue, Gepard for speech) behind a circuit breaker. It switches on wallet, credit, rate-limit or auth errors without ending the session.',
			'An admin switch at /admin (Auto, Force Vapi, Force Fallback) that needs no redeploy.',
			'Grading that shows missing data as null, never zero. Five categories from 0 to 10, plus an overall 0 to 100, after the session.',
			'7 tables and 13 row-level security policies, with no secret keys in the browser.'
		],
		proofPoints: [
			'84 unit tests across 35 suites (0 failures, about 2.2 seconds).',
			'Six Playwright specs against a production build.',
			'Ten logged and resolved challenges, including the model answering its own questions and the TTS reading Markdown aloud.',
			'About 50 KNUST students in informal pilots, whose feedback changed the prompts.',
			'A friend practised with it before a Meridian interview and saw some questions come up again.'
		],
		limits: [
			'No controlled study.',
			'No comparison against human raters.',
			'No load test.',
			'Ghanaian-accent accuracy is not measured.'
		],
		next: 'Nkonim, the commercial version: fallback by default (about $0.02 to $0.04 per session versus $0.50 to $0.90 on Vapi), a consent gate, and a paid pilot with one Ghanaian HR team before anything bigger.'
	},
	{
		slug: 'nabbycare',
		title: 'NabbyCare+',
		status: 'Live (ADHD module)',
		role: 'Builder',
		team: 'Not recorded',
		stack: [
			'Next.js 15',
			'React',
			'Tailwind CSS',
			'Framer Motion',
			'Zustand',
			'Supabase',
			'Prisma'
		],
		dates: 'Blueprint v2.0, June 2026, Phase A',
		summary:
			'A private first step for people who suspect something is off: self-screening on full validated questionnaires, not diagnosis, with a CareMap of your answers and no account.',
		proof:
			'Crisis interrupt on PHQ-9 item 9 · results in warm bands, never "positive screen"',
		links: [
			live('Visit NabbyCare+', 'https://nabby-care-7ymj.vercel.app/'),
			{ label: 'Read the NabbyCare+ case study', href: '/work/nabbycare/' }
		],
		preview: {
			src: '/images/projects/nabby-care1.webp',
			width: 1200,
			height: 581,
			alt: 'NabbyCare+ self-screening screen'
		},
		forWhom:
			'Someone who suspects something is off and wants a private first step before talking to a clinic.',
		whatBroke:
			'A screening tool that sounds like a diagnosis, or a result labelled "positive screen", can push someone away from the help they actually need.',
		decisions: [
			'The ADHD module uses the full ASRS v1.1 wording. Other instruments (OCI-R, PCL-5, GAD-7, PHQ-9) are in the product plan and are not open yet.',
			'A CareMap shows the answers. There is no account.',
			'PHQ-9 item 9 triggers a crisis interrupt.',
			'Results use warm bands. The product never says "positive screen".'
		],
		proofPoints: [
			'The safety rules above are in the live ADHD module.',
			'User numbers are not recorded, so none are quoted.'
		],
		limits: [
			'Only the ADHD module is open. OCD, PTSD, anxiety and depression are listed and not yet available.',
			'The AI provider is not settled, so it is not named.',
			'This is self-screening. It is not a diagnosis, and it does not claim to reduce illness.'
		],
		next: 'Open the other modules only when the same safety rules can hold. A paid tier is in the plan. It is not on sale.'
	},
	{
		slug: 'the-control-room',
		title: 'The Control Room',
		status: 'Live, invite-only',
		role: 'Co-founder with Nii Omanye Harding',
		team: 'Daniel Mawuena and Nii Omanye Harding',
		stack: ['Next.js 14', 'Supabase Realtime', 'shadcn/ui', 'Tailwind CSS'],
		dates: 'November 2025 to present',
		summary:
			'A FIFA tournament platform for alumni communities: Google sign-in, team locks, a live league table and a Hall of Fame.',
		proof:
			'Every score writes through one strict path, so nobody settles the bracket in the group chat.',
		links: [
			live('Visit The Control Room', 'https://thecontrolroom.vercel.app/'),
			{ label: 'Read The Control Room case study', href: '/work/the-control-room/' }
		],
		preview: {
			src: '/images/projects/the-control-room1.webp',
			width: 1200,
			height: 773,
			alt: 'The Control Room tournament table'
		},
		forWhom: 'An alumni group running a FIFA tournament that has to survive the group chat.',
		whatBroke:
			'Tournament arguments usually start from messy records. Scores get rewritten in chat and nobody can point at a ledger.',
		decisions: [
			'Google sign-in, team selection with locks, and admin checks on offline payments.',
			'A live league table (points, goal difference, clean sheets), a champion, and a Hall of Fame.',
			'Every score writes through one strict path, so nobody settles the bracket in the group chat.'
		],
		proofPoints: [
			'The ledger rule is the product. Tournament and player counts are not recorded, so none are quoted.'
		],
		limits: [
			'Invite-only.',
			'The split of work between me and Nii Omanye Harding is not written down yet.'
		],
		next: 'Keep the record strict. Nothing else is committed in public.'
	},
	{
		slug: 'wondez-barber',
		title: 'Wondez Barber',
		status: 'In build',
		role: 'Freelance, paid',
		team: 'Planner and builder, for a paid client',
		stack: [
			'React',
			'Vite',
			'Supabase',
			'Paystack',
			'Hubtel SMS',
			'Sentry',
			'Playwright',
			'Cloudflare Turnstile'
		],
		dates: '2026, Phase 0 planning as of 7 Oct 2026',
		summary:
			'Online booking for a neighbourhood barber who loses time to no-shows. Walk-ins and WhatsApp stay.',
		proof:
			'GHS 50 deposit via Paystack · slot held 10 min while paying · only the signed webhook confirms a booking · 34 edge cases before any booking code',
		closing: 'The website can refuse the payment. The barber can still say sit down.',
		links: [{ label: 'Read the Wondez Barber case study', href: '/work/wondez-barber/' }],
		forWhom:
			'A neighbourhood barber with one hand on the clippers and one thumb on WhatsApp. No-shows and double bookings cost him the next hour. Walk-ins stay.',
		whatBroke:
			'A slot that looks booked before the money is real, or a deposit rule that punishes the client who lives down the street.',
		decisions: [
			'A GHS 50 deposit via Paystack, Mobile Money or card.',
			'The slot is held for 10 minutes while the customer pays.',
			'Only the signed Paystack webhook confirms a booking. Late payments are refunded in full.',
			'34 edge cases were written down before any booking code.'
		],
		proofPoints: [
			'The edge-case matrix is the proof so far. The booking flow is not shipped, so there is no live pass count.'
		],
		limits: [
			'Still in planning, waiting on the client to agree the rules note.',
			'No public URL yet.'
		],
		next: 'Build the booking flow once the rules are agreed. Data-protection registration is already in the plan.',
		credit: undefined
	}
];

export const featuredSlugs = [
	'intervue-ai',
	'nabbycare',
	'the-control-room',
	'wondez-barber'
] as const;

export function getStudy(slug: string): CaseStudy | undefined {
	return caseStudies.find((study) => study.slug === slug);
}

export function featuredStudies(): CaseStudy[] {
	return featuredSlugs.map((slug) => getStudy(slug)!);
}

export type AlsoBuilt = {
	title: string;
	status: string;
	role: string;
	summary: string;
	metric?: string;
	links?: WorkLink[];
};

export const alsoBuilt: AlsoBuilt[] = [
	{
		title: 'Nkonim',
		status: 'In progress',
		role: 'Commercial version of the interview simulator',
		summary:
			'One product. Two surfaces. One engine. A model score never, by itself, rejects a candidate. Winifred is not involved in this version.'
	},
	{
		title: 'KNUST VirtuGuide and Medical Symptom Checker',
		status: 'Done, Jan to Apr 2025',
		role: 'Team lead of 8',
		summary:
			'I ran sprint planning, set the coding standards and put CI in place so eight people could ship into one codebase.'
	},
	{
		title: 'Airdrop Tracker',
		status: 'Archived',
		role: 'Built it full-stack',
		summary:
			'A tracker for crypto airdrop hunters with real-time sync, streaks and a premium tier. It once had 140+ active users before airdrops stopped being relevant.',
		metric: 'Once had 140+ active users',
		links: [live('airdroptracker.app', 'https://airdroptracker.app')]
	},
	{
		title: 'KAVD open-source repos',
		status: 'Public',
		role: 'I set up the repos and stack',
		summary:
			'phone-controller and phone-trackpad are public under KAVD Corp. I set up the repositories and the stack. I do not claim the lines in each repo.',
		links: [
			live('KAVD on GitHub', 'https://github.com/KAVD-CORP'),
			live('phone-controller', 'https://github.com/KAVD-CORP/phone-controller'),
			live('phone-trackpad', 'https://github.com/KAVD-CORP/phone-trackpad')
		]
	}
];

export function studyMeta(study: CaseStudy): PageMeta {
	const description = study.summary.slice(0, 180);
	return {
		title: `${study.title} · Daniel Mawuena`,
		description,
		canonical: `${SITE}/work/${study.slug}/`,
		image: OG_IMAGE,
		imageAlt: OG_ALT,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'SoftwareApplication',
			name: study.title,
			applicationCategory: 'WebApplication',
			operatingSystem: 'Web',
			description: study.summary,
			url: `${SITE}/work/${study.slug}/`,
			author: {
				'@type': 'Person',
				name: 'Daniel Bubu Mawuena',
				url: SITE
			}
		}
	};
}
