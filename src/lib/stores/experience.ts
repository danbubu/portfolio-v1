export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	location: string;
	startDate: string;
	endDate: string | null; // null means current
	description: string[];
	technologies: string[];
}

export interface Certification {
	id: string;
	title: string;
	issuer: string;
	date: string;
	image: string;
	link: string;
}

// TODO(Daniel): confirm a distinction for the team-of-8 project before that word appears anywhere.
// TODO(Daniel): confirm Wondez is happy to be named publicly. The entry uses the dossier name until you say otherwise.

export const experiences: WorkExperience[] = [
	{
		id: 'kavd',
		company: 'KAVD Corp',
		position: 'CTO and co-founder',
		location: 'Remote. Bootstrapped, not yet registered',
		startDate: '2026',
		endDate: null,
		description: [
			'Four of us, all on national service, bootstrapped and not yet registered. I set up every repository, chose the stack and write the working instructions so we can build asynchronously.'
		],
		technologies: ['CTO', 'GitHub', 'Async']
	},
	{
		id: 'rpl',
		company: 'RPL Technologies',
		position: 'QA and Frontend Engineer',
		location: 'Remote · Part-time (national service)',
		startDate: '2026',
		endDate: null,
		description: [
			'Run a structured QA loop on each build: verify developer fixes, log findings and send batched QA reports to the engineering lead.',
			'QA-test an Expense Automation system for Fidelity Bank Ghana across a Flexcube 11.7 to 14.7 migration, catching regressions before release. RPL works with OrangeTech on this project.',
			'Build responsive UI and product flows in React on Kemy, a separate product.'
		],
		technologies: ['QA', 'React', 'Playwright', 'JavaScript', 'Git']
	},
	{
		id: 'wondez',
		company: 'Wondez Barber',
		position: 'Freelance developer',
		location: 'Tema, Ghana',
		startDate: '2026',
		endDate: 'In build',
		description: [
			'My first paid project: online booking with a GHS 50 deposit via Paystack, so a neighbourhood barber loses less time to no-shows. 34 edge cases written down before any booking code.'
		],
		technologies: ['React', 'Supabase', 'Paystack']
	},
	{
		id: 'intervue',
		company: 'KNUST final-year project (Intervue AI)',
		position: 'Technical Project Lead',
		location: 'Kumasi, Ghana',
		startDate: '2025',
		endDate: '2026',
		description: [
			'Designed and built Intervue AI, a live voice mock-interview app (Next.js 15, React 19, Supabase). My partner Winifred Anokye researched the company data.',
			'Ran sprint planning, architecture and QA: 84 unit tests across 35 suites and six production-build Playwright specs.'
		],
		technologies: ['Next.js', 'Supabase', 'Playwright', 'QA']
	},
	{
		id: 'virtuguide',
		company: 'KNUST third-year project',
		position: 'Team Lead (team of 8)',
		location: 'Kumasi, Ghana',
		startDate: 'Jan 2025',
		endDate: 'Apr 2025',
		description: [
			'Led eight students building KNUST VirtuGuide (campus navigation and virtual tour) and a Medical Symptom Checker.',
			'Ran sprint planning, set coding standards and put CI in place so eight people could ship into one codebase.'
		],
		technologies: ['Leadership', 'React', 'Node.js', 'Firebase', 'Git']
	},
	{
		id: 'adroit-2024',
		company: 'Adroit 360',
		position: 'Software Development Intern',
		location: 'Tema, Ghana',
		startDate: 'Aug 2024',
		endDate: 'Oct 2024',
		description: [
			'Built responsive React and Tailwind interfaces with the UI/UX team, with attention to performance and accessibility.'
		],
		technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Git']
	},
	{
		id: 'adroit-2023',
		company: 'Adroit 360',
		position: 'Web Developer Intern',
		location: 'Tema, Ghana',
		startDate: 'Aug 2023',
		endDate: 'Nov 2023',
		description: [
			'Built client websites with HTML, CSS, JavaScript, Bootstrap and PHP.',
			'Used version control and joined daily stand-ups.'
		],
		technologies: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'PHP']
	}
];

export const certifications: Certification[] = [
	{
		id: '1',
		title: 'AWS Certified Cloud Practitioner',
		issuer: 'Amazon Web Services',
		date: 'August 2025 (valid to August 2028)',
		image: '/images/aws_certified_cloud_practitioner.png',
		link: 'https://www.credly.com/badges/4b871c78-3ec1-4b64-a5fb-c437b03aee74/academic_transcript'
	},
	{
		id: '2',
		title: 'AWS re/Start Graduate',
		issuer: 'AWS Training and Certification',
		date: 'July 2025',
		image: '/images/aws_restart_graduate.png',
		link: 'https://www.credly.com/badges/7d1e65f4-289a-46ea-9872-fdd293c73d9a/academic_transcript'
	},
	{
		id: '3',
		title: 'Cloud Computing Fundamentals',
		issuer: 'IBM SkillsBuild',
		date: 'July 2025',
		image: '/images/cloud_computing_fundamentals.png',
		link: 'https://www.credly.com/badges/818fabee-0a84-4761-b2b5-61b6f23e4ccb/academic_transcript'
	},
	{
		id: '4',
		title: 'Cybersecurity Fundamentals',
		issuer: 'IBM SkillsBuild',
		date: 'August 2025',
		image: '/images/cyber_security_fundamentals.png',
		link: 'https://www.credly.com/badges/398a4c35-00d1-4509-aef4-587ea5087a13/academic_transcript'
	}
];
