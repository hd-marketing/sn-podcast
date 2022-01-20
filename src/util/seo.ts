import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import type { IEpisodeFields } from "@/@types/generated/contentful";

import { generateSlug } from "./slug";

const DOMAIN = process.env.NEXT_DOMAIN;
const SLICE_AFTER = 140;

export const generateStructuredEpisodeData = (e: IEpisodeFields) => {
	const plainDescription = documentToPlainTextString(e.description);
	const description = plainDescription.slice(
		0,
		SLICE_AFTER +
			plainDescription.slice(SLICE_AFTER, SLICE_AFTER + 20).indexOf(" "),
	);
	return {
		"@context": "https://schema.org/",
		"@type": "PodcastEpisode",
		url: `https://${DOMAIN}/epizodok/${generateSlug(e.title)}`,
		name: e.title,
		datePublished: e.releaseDate,
		description,
		thumbnailUrl: `https${e.cover?.fields.file.url}`,
		partOfSeries: {
			"@type": "PodcastSeries",
			name: "InfluenceAir Podcast",
			url: `https://${DOMAIN}/epizodok/`,
		},
	};
};

const domain = process.env.NEXT_DOMAIN ?? "influenceairpodcast.hu";

export const generateEpisodeSocialPreview = (
	e: IEpisodeFields,
): ISocialGeneratedMeta => {
	const plainDescription = documentToPlainTextString(e.description);
	const description = plainDescription.slice(
		0,
		SLICE_AFTER +
			plainDescription.slice(SLICE_AFTER, SLICE_AFTER + 20).indexOf(" "),
	);
	return {
		title:
			e.title.length + e.guestName.length + 3 < 60
				? `${e.title} - ${e.guestName}`
				: e.title,
		description: `${description}...`,
		type: "website",
		image: `https:${e.cover?.fields.file.url}`,
		domain,
		url: `${domain}/epizodok/${e.slug}`,
	};
};

interface ISocialGeneratedMeta {
	title: string;
	description: string;
	type: string;
	image: string;
	domain: string;
	url: string;
}
