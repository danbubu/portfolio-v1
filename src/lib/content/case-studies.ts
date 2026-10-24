export type CaseLink = {
	label: string;
	href: string;
};

export type CaseReport = {
	label: string;
	/** Real pass counts only. Empty when we do not have a test run. */
	ticks: string[];
	notes: string[];
};

export type CaseStudy = {
	slug: string;
	title: string;
	summary: string;
	status: string;
	role: string;
	team: string;
	stack: string[];
	dates: string;
	links: CaseLink[];
	person: string;
	failure: string;
	decisions: string[];
	proof: string[];
	limits: string[];
	next: string;
	credit?: string;
	report: CaseReport | null;
};

// TODO(Daniel): NabbyCare+ user numbers, the AI provider, and who the product is for are still open. Do not fill them in.
// TODO(Daniel): The Control Room split with Nii Omanye Harding, and any tournament or player counts.
// TODO(Daniel): Confirm Wondez is happy to be named on the public site. The copy below uses the name from the approved dossier.
// TODO(Daniel): Airdrop Tracker stays off this list. The live URL is still up; see the projects store before removing it.

export const caseStudies: CaseStudy[] = [
	{
		slug: 'intervue-ai',
		title: 'Intervue AI',
		summary:
			'Live voice mock interviews for Ghanaian students heading into NSS and internship interviews, drawing on a library of 51 Ghanaian employers and how they interview.',
		status: 'Live',
		role: 'I designed and built the product',
		team: 'Final-year project at KNUST with Winifred Anokye',
		stack: [
			'Next.js 15',
			'React 19',
			'TypeScript',
			'Supabase',
			'Vapi',
			'Groq Whisper',
			'DeepSeek',
			'Gepard',
			'Playwright'
		],
		dates: 'May to August 2026. Report submitted September 2026.',
		links: [{ label: 'Open the live app', href: 'https://intervue-ai-gilt.vercel.app/' }],
		person:
			'A final-year student with an NSS interview next week and nobody to practise with out loud.',
		failure:
			"Our voice vendor's wallet ran out mid-interview more than once, and students' interviews died mid-sentence.",
		decisions: [
			'A second voice path from three services (Groq Whisper for speech-to-text, DeepSeek for dialogue, Gepard for speech) sits behind a circuit breaker. It switches on wallet, credit, rate-limit or auth errors without ending the session.',
			'An admin switch at /admin (Auto, Force Vapi, Force Fallback) needs no redeploy.',
			'Grading shows missing data as null, never zero. Five categories are scored 0 to 10, plus an overall 0 to 100.',
			'Seven tables and 13 row-level security policies. No secret keys in the browser.'
		],
		proof: [
			'84 unit tests across 35 suites, 0 failures, about 2.2 seconds.',
			'Six Playwright specs against a production build.',
			'Ten logged and resolved challenges, including the model answering its own questions and the TTS reading Markdown aloud.',
			'About 50 KNUST students in informal pilots. Their feedback changed the prompts.'
		],
		limits: [
			'No controlled study.',
			'No comparison against human raters.',
			'No load test.',
			'Ghanaian-accent accuracy is not measured.'
		],
		next: 'Nkonim is the commercial version: fallback by default (about $0.02 to $0.04 per session versus $0.50 to $0.90 on Vapi), a consent gate, and a paid pilot with one Ghanaian HR team before anything bigger.',
		credit:
			'I designed and built the product. Winifred Anokye, my project partner, researched the 51-company library, including phoning some of the companies. Supervised by Rev. (Dr.) Kwame Ofosuhene Peasah.',
		report: {
			label: 'Intervue AI',
			ticks: ['84/84 unit', '6/6 e2e'],
			notes: ['Playwright', 'thesis freeze, Aug 2026']
		}
	},
	{
		slug: 'nabbycare',
		title: 'NabbyCare+',
		summary:
			'A private first step for people who suspect something is off: self-screening on full validated questionnaires, not diagnosis, with a CareMap of your answers and no account.',
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
		dates: 'Product Blueprint v2.0, June 2026. The ADHD module is the one that is open.',
		links: [{ label: 'Open the live app', href: 'https://nabby-care-7ymj.vercel.app/' }],
		person: 'Someone who wants a private first look, before talking to another person, and who should not be handed a diagnosis by a website.',
		failure:
			'A screening tool can frighten people with a hard label, or miss a crisis answer on PHQ-9 item 9.',
		decisions: [
			'Validated question wording stays intact. The calm presentation is only presentation.',
			'Results use warm bands, never a "positive screen" label.',
			'PHQ-9 item 9 triggers an immediate crisis interrupt.',
			'No account is required.'
		],
		proof: [
			'Crisis interrupt on PHQ-9 item 9.',
			'Results stay in warm bands.',
			'The ADHD module is live. OCD, PTSD, anxiety and depression are listed and not yet open.'
		],
		limits: [
			'This is self-screening, not diagnosis.',
			'User numbers are not recorded.',
			'The AI provider is not settled, so it is not named here.',
			'Playwright and Vitest coverage is planned, not claimed.'
		],
		next: 'The other modules stay closed until the same safety rules are in place for each one.',
		report: null
	},
	{
		slug: 'the-control-room',
		title: 'The Control Room',
		summary:
			'A FIFA tournament platform for alumni communities: Google sign-in, team locks, a live league table and a Hall of Fame.',
		status: 'Live, invite-only',
		role: 'Co-founder',
		team: 'Co-founded with Nii Omanye Harding',
		stack: ['Next.js 14', 'Supabase Realtime', 'shadcn/ui', 'Tailwind CSS'],
		dates: 'November 2025 to present.',
		links: [{ label: 'Open the live app', href: 'https://thecontrolroom.vercel.app/' }],
		person: 'An alumni group running a FIFA tournament, where the argument starts when two people remember the score differently.',
		failure: 'Tournament arguments usually start from messy records.',
		decisions: [
			'Every score writes through one strict path, so nobody settles the bracket in the group chat.',
			'Google sign-in, team selection with locks, and admin checks on offline payments.',
			'A live league table (points, goal difference, clean sheets) and a Hall of Fame once a champion is final.'
		],
		proof: ['The ledger is the product. The page does not claim a tournament or player count.'],
		limits: [
			'Tournament and player counts are not recorded.',
			'Which parts I built, and which parts Nii Omanye Harding built, are not recorded yet.'
		],
		next: 'Keep the ledger strict. Add a plain line about the split of work once it is written down.',
		report: null
	},
	{
		slug: 'wondez-barber',
		title: 'Wondez Barber',
		summary:
			'Online booking for a neighbourhood barber who loses time to no-shows. Walk-ins and WhatsApp stay.',
		status: 'In build',
		role: 'Freelance developer. My first paid project.',
		team: 'I am planning and building it for the client.',
		stack: ['React', 'Vite', 'Supabase', 'Paystack', 'Hubtel SMS', 'Playwright', 'Cloudflare Turnstile'],
		dates: '2026. Phase 0 planning as of 7 October 2026, waiting on the client\'s OK on the rules note.',
		links: [],
		person: 'A neighbourhood barber. One hand on the clippers, one thumb on the phone. A no-show costs him the slot.',
		failure:
			'Bookings over WhatsApp double up, and a no-show is time he cannot get back. The site must not take the walk-in or the WhatsApp message away.',
		decisions: [
			'A GHS 50 deposit via Paystack. The slot is held for 10 minutes while the customer pays.',
			'Only the signed Paystack webhook confirms a booking. A late payment is refunded in full.',
			'34 edge cases were written down before any booking code.'
		],
		proof: [
			'GHS 50 deposit.',
			'Slot held 10 minutes while paying.',
			'34 edge cases listed before booking code.',
			'The website can refuse the payment. The barber can still say sit down.'
		],
		limits: [
			'Still in planning. There is no live link yet.',
			'The rules note is waiting on the client.'
		],
		next: 'Build the booking flow once the rules note is agreed.',
		report: {
			label: 'Wondez Barber',
			ticks: [],
			notes: ['34 edge cases listed', 'booking code not started']
		}
	}
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
	return caseStudies.find((study) => study.slug === slug);
}
