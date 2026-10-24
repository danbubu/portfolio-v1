import { error } from '@sveltejs/kit';
import { caseStudies, getStudy, studyMeta } from '$lib/content/work';

export const prerender = true;

export function entries() {
	return caseStudies.map((study) => ({ slug: study.slug }));
}

export function load({ params }) {
	const study = getStudy(params.slug);
	if (!study) error(404, 'Not found');
	return { study, meta: studyMeta(study) };
}
