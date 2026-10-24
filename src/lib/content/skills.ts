export type SkillGroup = {
	label: string;
	items: string[];
	note?: string;
};

/** No Python, Rust or C#. Go is learning, not a claimed skill. */
export const skillGroups: SkillGroup[] = [
	{
		label: 'Frontend',
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
		label: 'Backend and data',
		items: ['Node.js', 'Supabase', 'PostgreSQL', 'Firebase', 'REST APIs', 'Zod'],
		note: 'Learning Go.'
	},
	{
		label: 'AI',
		items: [
			'LLM integration (DeepSeek, Vapi, Groq Whisper)',
			'Prompt engineering',
			'Multi-vendor fallback design'
		]
	},
	{
		label: 'Quality',
		items: [
			'QA',
			'Playwright',
			'Node test runner',
			'UAT',
			'Bug reporting',
			'Regression testing on a bank migration'
		]
	},
	{
		label: 'Cloud and tooling',
		items: ['AWS', 'Docker', 'Git', 'GitHub', 'GitLab', 'GitHub Actions', 'Vercel']
	}
];
