import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { EpisodeList } from "@/components/episode/EpisodeList";
import { ShortIntroduction } from "@/components/introduction/ShortIntroduction";
import { SocialPanel } from "@/components/socials/SocialPanel";
import { getEpisodes } from "@/util/contentful";

export default function Page({
	episodes,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<meta property="og:image" content="/cover.jpg" />
			</Head>
			<div>
				<ShortIntroduction />
				<SocialPanel
					spotify="https://open.spotify.com/show/1oS0OnLaxlgnvgLKqBmT7X?si=cgDVseZ0TCqbvqSQ4Pxgkg"
					apple="https://podcasts.apple.com/us/podcast/influenceair-podcast/id1598296623"
					youtube="https://www.youtube.com/channel/UCxVuKBFit6CQR9gnbNLf-Mg"
					facebook="https://www.facebook.com/influenceairpodcast"
					instagram="https://www.instagram.com/influenceairpodcast/"
					tiktok="https://www.tiktok.com/@influenceairpodcast"
					classname="rounded-full shadow-figma-base  text-3xl bg-white text-black"
				/>
				<EpisodeList title="Legutóbbi adásaink" episodes={episodes} limit={4} />
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	return {
		props: {
			episodes: await getEpisodes(),
		},
		revalidate: 60 * 5,
	};
};
