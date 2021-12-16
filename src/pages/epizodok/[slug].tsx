import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { BsFillCalendarDateFill, BsFillStopwatchFill } from "react-icons/bs";

import { BaseCard } from "@/components/content/BaseCard";
import { InfoTag } from "@/components/episode/InfoTag";
import { purifyDescription } from "@/util/content";
import { generateSlug } from "@/util/slug";
import { getEpsiodes, getOneEpisode } from "@/util/spotify";

export default function SelectedEpisodePage({
	episode: { name, description, duration_ms, release_date, images },
}: {
	episode: SpotifyApi.EpisodeObjectSimplified;
}) {
	const [mainText, eplinks, restText] = purifyDescription(description);
	return (
		<>
			<Head>
				<title>{name} | InfluenceAir Podcast</title>
				<meta name="description" content={mainText} />
			</Head>
			<article className="my-4">
				<div className="relative mb-8 w-full h-64 lg:h-80">
					<Image
						src={images[0].url}
						layout="fill"
						objectFit="cover"
						className="rounded-figma-base"
						alt="Az epizód indexképe"
					/>
				</div>
				<h1 className="mb-6 text-3xl lg:text-4xl font-bold">{name}</h1>
				<div className="flex flex-row gap-4">
					<InfoTag
						icon={<BsFillStopwatchFill />}
						text={`${Math.round(duration_ms / 1000 / 60)} perc`}
					/>
					<InfoTag icon={<BsFillCalendarDateFill />} text={release_date} />
				</div>

				<BaseCard color="blue">
					<p className="lg:text-lg">{mainText}</p>
				</BaseCard>

				<BaseCard color="purple">
					<p className="lg:text-lg break-all">{eplinks}</p>
				</BaseCard>
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
	const allEpisodes = await getEpsiodes();
	return {
		paths:
			allEpisodes.map(({ name }) => `/epizodok/${generateSlug(name)}`) ?? [],
		fallback: false,
	};
};
