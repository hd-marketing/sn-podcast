import { MenuIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Router } from "next/router";
import { useState } from "react";

import { HeaderLink } from "./HeaderLink";

export function Header() {
	const [isOpen, setIsOpen] = useState(false);

	Router.events.on("routeChangeStart", () => {
		setIsOpen(false);
	});

	return (
		<>
			<nav className="flex z-40 justify-between items-center py-2 px-8 font-noto-sans text-white bg-gradient-to-r from-iair-darkblue to-iair-lightblue">
				<div className="w-8" />
				<Link href="/" passHref>
					<div className="relative w-16 h-16">
						<Image src="/logo_white.svg" layout="fill" />
					</div>
				</Link>
				<MenuIcon
					className=" w-8 cursor-pointer select-none"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
			</nav>

			<LazyMotion features={domAnimation}>
				<AnimatePresence>
					<m.nav
						key="navbar"
						animate={isOpen ? "open" : "closed"}
						initial={{ opacity: 0 }}
						variants={{
							open: { opacity: 1, y: 0 },
							closed: { opacity: 0, y: "-100%" },
						}}
						transition={{ duration: 0.2, delay: 0.1 }}
						className={clsx(
							"absolute z-30 w-full font-noto-sans text-2xl text-center lowercase bg-white rounded-b-figma-base shadow-figma-base",
						)}
					>
						<ul className="flex flex-col gap-4 justify-center items-center pt-32 pb-16 h-full">
							<HeaderLink text="Főoldal" href="/" />
							<HeaderLink text="Epizódok" href="/epizodok" />
							<HeaderLink text="Rólunk" href="/rolunk" />
						</ul>
					</m.nav>
					<m.div
						onClick={() => {
							setIsOpen(false);
						}}
						animate={isOpen ? "open" : "closed"}
						variants={{
							open: { opacity: 0.5 },
							closed: { opacity: 0 },
						}}
						transition={{ duration: 0.4, delay: 0.1 }}
						className={clsx(
							"absolute z-20 w-full h-full bg-black",
							!isOpen && "hidden",
						)}
					/>
				</AnimatePresence>
			</LazyMotion>
		</>
	);
}
