import { OG_ALT, OG_IMAGE, SITE, type PageMeta } from '$lib/content/site';

const meta: PageMeta = {
	title: 'CV · Daniel Mawuena',
	description:
		'CV of Daniel Mawuena, full-stack developer and QA engineer in Tema, Ghana. The PDF download stays at the same address.',
	canonical: `${SITE}/cv/`,
	image: OG_IMAGE,
	imageAlt: OG_ALT
};

export function load() {
	return { meta };
}
