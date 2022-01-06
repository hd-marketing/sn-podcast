import { HeaderLink } from "../header/HeaderLink";

export function Footer() {
	const email = "sales@starnetwork.hu";
	const phone = "+36  20 210 99 29";
	return (
		<footer className="flex flex-col justify-center items-center p-8 w-full font-noto-sans text-white bg-gray-900">
			<ul className="flex flex-row gap-4 mb-6">
				<HeaderLink text="Főoldal" href="/" />|
				<HeaderLink text="Epizódok" href="/epizodok" />|
				<HeaderLink text="Rólunk" href="/rolunk" />
			</ul>
			<p className="text-center">
				Az InfluenceAir Podcastot a{" "}
				<a
					className="font-bold hover:text-iair-lightblue transition duration-300"
					href="https://starnetwork.hu"
					target="_blank"
					rel="noreferrer"
				>
					Star Network csapata{" "}
				</a>
				készíti{" "}
				<a
					className="font-bold hover:text-iair-lightblue transition duration-300"
					href="https://studio.starnetwork.hu"
					target="_blank"
					rel="noreferrer"
				>
					a Stúdiójukban
				</a>
			</p>
			<p className="text-sm">
				<a href={`mailto:${email}`}>{email}</a>
			</p>
			<p className="text-sm">
				<a href={`tel:${phone}`}>{phone}</a>
			</p>
			<p className="text-sm font-light">
				Creator Marketing Kft. © {new Date().getFullYear()}
			</p>
		</footer>
	);
}
