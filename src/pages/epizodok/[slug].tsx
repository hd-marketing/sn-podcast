import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Entry } from "contentful";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import {
	BsFillCalendarDateFill,
	BsFillCircleFill,
	BsFillStopwatchFill,
} from "react-icons/bs";

import type { IEpisodeFields } from "@/@types/generated/contentful";
import { InfoTag } from "@/components/episode/InfoTag";
import { SocialPanel } from "@/components/socials/SocialPanel";
import { getEpisodes, getOneEpisode } from "@/util/contentful";
import { renderOptions } from "@/util/renderOptions";
import { generateEpisodeSocialPreview } from "@/util/seo";
import { generateSlug } from "@/util/slug";

export default function SelectedEpisodePage({
	episode,
}: {
	episode: Entry<IEpisodeFields>;
}) {
	const { fields } = episode;
	const {
		title,
		guestName,
		cover,
		description,
		releaseDate,
		season,
		epNumber,
		youtubeLink,
		appleLink,
		spotifyLink,
		length,
	} = fields;
	const socialmetas = generateEpisodeSocialPreview(fields);
	return (
		<>
			<Head>
				<title>{socialmetas.title}</title>
				<meta name="description" content={socialmetas.description} />

				{/* facebook */}
				<meta property="og:title" content={socialmetas.title} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={socialmetas.title} />
				<meta property="og:description" content={socialmetas.description} />
				<meta property="og:image" content={socialmetas.image} />

				{/* twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content={socialmetas.domain} />
				<meta name="twitter:title" content={socialmetas.title} />
				<meta name="twitter:description" content={socialmetas.description} />
				<meta name="twitter:image" content={socialmetas.image} />
			</Head>
			<article>
				<div className="relative mb-8 w-full h-64 lg:h-80 -z-10">
					<Image
						priority
						src={cover ? `https:${cover.fields.file.url}` : "/cover.jpg"}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
						alt="Az epizód indexképe"
					/>
				</div>
				<div className="my-4 mx-auto -mt-12 w-2/3 max-w-lg">
					<SocialPanel
						apple={appleLink}
						youtube={youtubeLink}
						spotify={spotifyLink}
						classname="rounded-full shadow-figma-base  text-3xl bg-white text-black"
					/>
				</div>
				<h1 className="mb-6 text-3xl lg:text-4xl font-bold">{`${title} - ${guestName}`}</h1>
				<div className="flex flex-col items-start">
					<InfoTag
						episode
						icon={<BsFillCircleFill />}
						text={`S${season.toString().padStart(2, "0")}E${epNumber
							.toString()
							.padStart(2, "0")}`}
					/>
					<InfoTag icon={<BsFillStopwatchFill />} text={`${length} perc`} />
					<InfoTag
						icon={<BsFillCalendarDateFill />}
						text={new Date(releaseDate).toLocaleDateString("hu")}
					/>
				</div>

				<div className="my-8 max-w-none text-lg prose-a:text-iair-lightblue prose lg:prose-xl">
					{documentToReactComponents(description, renderOptions)}
				</div>
			</article>
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const episode = await getOneEpisode(params?.slug);
	return {
		props: {
			episode,
		},
	};
};

export const getStaticPaths = async () => {
	const allEpisodes = await getEpisodes();
	return {
		paths:
			allEpisodes.items.map(
				({ fields }) => `/epizodok/${generateSlug(fields.title)}`,
			) ?? [],
		fallback: false,
	};
};
