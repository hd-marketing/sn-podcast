import type { EntryCollection } from "contentful";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useState } from "react";

import type { IEpisodeFields } from "@/@types/generated/contentful";
import { EpisodeList } from "@/components/episode/EpisodeList";
import { SearchBar } from "@/components/search/SearchBar";
import { getEpisodes } from "@/util/contentful";

export default function EpisodesPage({
	episodes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [searchQuery, setSearchQuery] = useState("");
	const filteredEpisodes = episodes.items.filter(({ fields }) =>
		`${fields.title} - ${fields.guestName} - ${fields.epNumber}`
			.toLowerCase()
			.normalize("NFD")
			.replace(/[^\w ]+/g, "")
			.includes(
				searchQuery
					.toLowerCase()
					.normalize("NFD")
					.replace(/[^\w ]+/g, ""),
			),
	);
	return (
		<>
			<Head>
				<title>Epizódok</title>
			</Head>
			<div>
				<SearchBar
					numOfHits={filteredEpisodes.length}
					text={searchQuery}
					onChange={setSearchQuery}
				/>
				<EpisodeList
					episodes={
						{ items: filteredEpisodes } as EntryCollection<IEpisodeFields>
					}
					title="Epizódok"
				/>
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
