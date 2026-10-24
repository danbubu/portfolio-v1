export type AlsoBuilt = {
	title: string;
	status: string;
	detail: string;
	href?: string;
};

export const alsoBuilt: AlsoBuilt[] = [
	{
		title: 'Nkonim',
		status: 'In progress',
		detail:
			'The commercial version of the interview simulator. One product. Two surfaces. One engine. A model score never, by itself, rejects a candidate. I build and own this product. Winifred is not part of it.'
	},
	{
		title: 'KNUST VirtuGuide and Medical Symptom Checker',
		status: 'Done, Jan to Apr 2025',
		detail:
			'Team lead of eight. I ran sprint planning, set the coding standards and put CI in place so eight people could ship into one codebase.'
	},
	{
		title: 'Airdrop Tracker',
		status: 'Archived',
		detail:
			'A tracker for crypto airdrop hunters with real-time sync, streaks and a premium tier. It once had 140+ active users before airdrops stopped being relevant.',
		// TODO(Daniel): airdroptracker.app still responds. Remove this link if you do not want the archived demo public.
		href: 'https://airdroptracker.app'
	},
	{
		title: 'KAVD phone-controller and phone-trackpad',
		status: 'Open source',
		detail:
			'I set up the repos and the stack. I do not claim I wrote each one. The org is github.com/KAVD-CORP.',
		href: 'https://github.com/KAVD-CORP'
	}
];
