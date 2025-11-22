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

export const experiences: WorkExperience[] = [
	{
		id: '0',
		company: 'KNUST (Capstone)',
		position: 'Technical Project Lead',
		location: 'Kumasi, Ghana',
		startDate: 'Jan 2025',
		endDate: 'Apr 2025',
		description: [
			'Directed a cross-functional team of 8 engineers to develop and deploy two full-stack applications: "KNUST VIRTUGUIDE" (Campus Navigation System) and "Medical Symptom Checker" (Healthcare AI)',
			'Orchestrated Agile sprint planning, architecture design, and strict QA protocols, resulting in a distinction-grade delivery',
			'Implemented CI/CD pipelines and established coding standards using React, Node.js, and Git'
		],
		technologies: ['Leadership', 'Agile', 'React', 'Firebase', 'Node.js', 'Git']
	},
	{
		id: '1',
		company: 'Adroit 360',
		position: 'Web Developer Intern',
		location: 'Tema, Ghana',
		startDate: 'Aug 2024',
		endDate: 'Oct 2024',
		description: [
			'Collaborated with UI/UX teams to implement pixel-perfect responsive designs',
			'Optimized existing React codebases for better performance and accessibility',
			'Shipped production interfaces using Tailwind CSS and modern JavaScript'
		],
		technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Git']
	},
	{
		id: '2',
		company: 'Adroit 360',
		position: 'Web Developer Intern',
		location: 'Tema, Ghana',
		startDate: 'Aug 2023',
		endDate: 'Nov 2023',
		description: [
			'Assisted in the development of client websites and web applications',
			'Learned and applied industry best practices for version control and code quality',
			'Participated in daily stand-ups and agile development processes'
		],
		technologies: ['HTML/CSS', 'JavaScript', 'Bootstrap', 'PHP']
	}
];

export const certifications: Certification[] = [
	{
		id: '1',
		title: 'AWS Certified Cloud Practitioner',
		issuer: 'Amazon Web Services',
		date: '2025',
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
