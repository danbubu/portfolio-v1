import { error } from '@sveltejs/kit';
import { caseStudies, findCaseStudy } from '$lib/content/case-studies';

export const prerender = true;

export function entries() {
	return caseStudies.map((study) => ({ slug: study.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const study = findCaseStudy(params.slug);
	if (!study) throw error(404, 'Case study not found');
	return { study };
}
