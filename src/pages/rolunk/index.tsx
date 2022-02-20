import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";

import { getAboutUs } from "@/util/contentful";
import { renderOptions } from "@/util/renderOptions";

export default function AboutPage({
	aboutUs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { cover, description } = aboutUs.items[0].fields;
	return (
		<>
			<Head>
				<title>Rólunk | InfluenceAir Podcast</title>
			</Head>
			<div>
				<div className="relative mb-4 w-full h-64 lg:h-96">
					<Image
						src={`https:${cover?.fields.file.url}`}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
				<div>
					<h1 className="mb-4 text-xl lg:text-2xl font-medium">Rólunk</h1>
				</div>
				<div className="my-8 max-w-none prose lg:prose-xl">
					{documentToReactComponents(description, renderOptions)}
				</div>
			</div>
		</>
	);
}

export const getStaticProps = async () => {
	return {
		props: {
			aboutUs: await getAboutUs(),
		},
		revalidate: 60 * 5,
	};
};
