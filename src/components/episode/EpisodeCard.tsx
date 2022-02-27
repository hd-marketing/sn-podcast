import Image from "next/image";
import Link from "next/link";
import {
	BsFillCalendarDateFill,
	BsFillCircleFill,
	BsFillStopwatchFill,
} from "react-icons/bs";

import type { IEpisodeFields } from "@/@types/generated/contentful";
import { generateSlug } from "@/util/slug";

import { InfoTag } from "./InfoTag";

export function EpisodeCard({
	title,
	cover,
	guestName,
	season,
	epNumber,
	releaseDate,
	length,
}: IEpisodeFields) {
	return (
		<Link href={`/epizodok/${generateSlug(title)}`} passHref>
			<div className="py-2 hover:bg-opacity-80 rounded-figma-base transition duration-300 cursor-pointer">
				<div className="flex flex-row gap-2 items-center ">
					<div className="relative flex-shrink-0 w-20 h-20">
						<Image
							src={
								cover?.fields.file.url
									? `https:${cover?.fields.file.url}`
									: "/cover.jpg"
							}
							layout="fill"
							objectFit="cover"
							className="rounded-lg"
							alt="az epizód indexképe"
						/>
					</div>
					<div className="flex flex-col">
						<h1 className="text-sm lg:text-lg font-bold">{`${title} - ${guestName}`}</h1>
						<div className="flex flex-row gap-2 text-xs lg:text-base">
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
					</div>
				</div>
			</div>
		</Link>
	);
}
