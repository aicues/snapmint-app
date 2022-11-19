/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ThirdwebWallet, SimpleWallet } from "./Wallets/Index";
// import { ConnectKitButton } from "connectkit";

import LocaleSwitcher from "./LocaleSwitcher"

import ComponentsIcon from '@icons/ComponentsIcon'
import ThemeIcon from '@icons/ThemeIcon'
import MenuIcon from '@icons/MenuIcon'
import MultilingualIcon from '@icons/MultilingualIcon'
import ArrowDownIcon from '@icons/ArrowDownIcon'

import { useAddress } from "@thirdweb-dev/react";

import Logo from '@icons/logo-dark.svg'
// import Logo_bold from '@icons/logo-dark-bold.svg'

const Navbar = function Navbar() {

    const address = useAddress();

  return (
     
    <div className="\n  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 \n  text-primary-content\n  ">
    
    <nav className="navbar w-full">
        <div className="flex flex-1 md:gap-1 lg:gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 "><Link href="/" aria-current="page" aria-label="Homepage"
                    className="btn btn-ghost px-2">
                    <div
                        className="text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                            <Logo className="inline-block h-8 w-full fill-current md:mr-2"></Logo>
                        {/* <span className="lowercase text-primary-content">Snapmint</span> */}
                    </div>
                </Link>
            </div>
            {/* Seach  */}
            {/* <Logo_bold className="inline-block h-8 w-full fill-current md:mr-2"/> */}
        </div>
        {/* Man nav ems */}
        <div className="flex">

            {/* Qafu Qatar  */}
            <div className="items-center flex-none hidden lg:block">
                <Link href="/qafu-qatar" className="btn btn-ghost drawer-button normal-case">
                        <ComponentsIcon/>Qafu Qatar
                </Link>
            </div>
            {/* Market */}
            <div className="items-center flex-none hidden lg:block">
            <Link href="/market/" className="btn btn-ghost drawer-button normal-case">
                        <ComponentsIcon/>Market
                </Link>
            </div>
            {/* My Assets */}
            <div className="items-center flex-none hidden lg:block">
            <Link href="/my/assets/" className="btn btn-ghost drawer-button normal-case">
                        <ComponentsIcon/>My Assets
                </Link>
                {/* <Link href={`/my/assets/${address}`}  className="btn btn-ghost drawer-button normal-case">
                        <ComponentsIcon/>My Assets
                </Link> */}
            </div>
            <div className="items-center flex-none hidden lg:block">
                <LocaleSwitcher/>
            </div>
            <div className="items-center flex-none hidden lg:block">
                <ThirdwebWallet/>
                {/* <SimpleWallet/> */}
                {/* <ConnectKitButton /> */}
            </div>
             {/* Change Theme */}
            {/* <div title="Change Theme" className="dropdown dropdown-end ">
                <div tabIndex={0} className="btn gap-1 normal-case btn-ghost">
                    <ThemeIcon/>
                    <span className="hidden md:inline">Theme</span>
                    <ArrowDownIcon/>
                </div>
                <div
                    className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
                    <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="light" data-act-classname="outline">
                            <div data-theme="light"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">light</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="dark" data-act-classname="outline">
                            <div data-theme="dark"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">dark</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="cupcake" data-act-classname="outline">
                            <div data-theme="cupcake"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">cupcake</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="bumblebee" data-act-classname="outline">
                            <div data-theme="bumblebee"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">bumblebee</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="emerald" data-act-classname="outline">
                            <div data-theme="emerald"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">emerald</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="corporate" data-act-classname="outline">
                            <div data-theme="corporate"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">corporate</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="synthwave" data-act-classname="outline">
                            <div data-theme="synthwave"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">synthwave</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="retro" data-act-classname="outline">
                            <div data-theme="retro"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">retro</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="cyberpunk" data-act-classname="outline">
                            <div data-theme="cyberpunk"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">cyberpunk</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="valentine" data-act-classname="outline">
                            <div data-theme="valentine"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">valentine</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="halloween" data-act-classname="outline">
                            <div data-theme="halloween"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">halloween</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="garden" data-act-classname="outline">
                            <div data-theme="garden"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">garden</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="forest" data-act-classname="outline">
                            <div data-theme="forest"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">forest</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="aqua" data-act-classname="outline">
                            <div data-theme="aqua"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">aqua</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="lofi" data-act-classname="outline">
                            <div data-theme="lofi"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">lofi</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="pastel" data-act-classname="outline">
                            <div data-theme="pastel"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">pastel</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="fantasy" data-act-classname="outline">
                            <div data-theme="fantasy"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">fantasy</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="wireframe" data-act-classname="outline">
                            <div data-theme="wireframe"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">wireframe</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="black" data-act-classname="outline">
                            <div data-theme="black"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">black</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="luxury" data-act-classname="outline">
                            <div data-theme="luxury"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">luxury</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="dracula" data-act-classname="outline">
                            <div data-theme="dracula"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">dracula</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="cmyk" data-act-classname="outline">
                            <div data-theme="cmyk"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">cmyk</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="autumn" data-act-classname="outline">
                            <div data-theme="autumn"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">autumn</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="business" data-act-classname="outline">
                            <div data-theme="business"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">business</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="acid" data-act-classname="outline">
                            <div data-theme="acid"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">acid</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="lemonade" data-act-classname="outline">
                            <div data-theme="lemonade"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">lemonade</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="night" data-act-classname="outline">
                            <div data-theme="night"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">night</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="coffee" data-act-classname="outline">
                            <div data-theme="coffee"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">coffee</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
                            data-set-theme="winter" data-act-classname="outline">
                            <div data-theme="winter"
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                        <div className="flex-grow text-sm font-bold">winter</div>
                                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                                            <div className="bg-primary w-2 rounded"></div>
                                            <div className="bg-secondary w-2 rounded"></div>
                                            <div className="bg-accent w-2 rounded"></div>
                                            <div className="bg-neutral w-2 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="outline-base-content overflow-hidden rounded-lg" href="/theme-generator/">
                            <div
                                className="hover:bg-neutral hover:text-neutral-content w-full cursor-pointer font-sans">
                                <div className="flex gap-2 p-3"><svg width="24" height="24"
                                        xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"
                                        viewBox="0 0 512 512">
                                        <path d="M96,208H48a16,16,0,0,1,0-32H96a16,16,0,0,1,0,32Z"></path>
                                        <line x1="90.25" y1="90.25" x2="124.19" y2="124.19"></line>
                                        <path
                                            d="M124.19,140.19a15.91,15.91,0,0,1-11.31-4.69L78.93,101.56a16,16,0,0,1,22.63-22.63l33.94,33.95a16,16,0,0,1-11.31,27.31Z">
                                        </path>
                                        <path
                                            d="M192,112a16,16,0,0,1-16-16V48a16,16,0,0,1,32,0V96A16,16,0,0,1,192,112Z">
                                        </path>
                                        <line x1="293.89" y1="90.25" x2="259.95" y2="124.19"></line>
                                        <path
                                            d="M260,140.19a16,16,0,0,1-11.31-27.31l33.94-33.95a16,16,0,0,1,22.63,22.63L271.27,135.5A15.94,15.94,0,0,1,260,140.19Z">
                                        </path>
                                        <line x1="124.19" y1="259.95" x2="90.25" y2="293.89"></line>
                                        <path
                                            d="M90.25,309.89a16,16,0,0,1-11.32-27.31l33.95-33.94a16,16,0,0,1,22.62,22.63l-33.94,33.94A16,16,0,0,1,90.25,309.89Z">
                                        </path>
                                        <path
                                            d="M219,151.83a26,26,0,0,0-36.77,0l-30.43,30.43a26,26,0,0,0,0,36.77L208.76,276a4,4,0,0,0,5.66,0L276,214.42a4,4,0,0,0,0-5.66Z">
                                        </path>
                                        <path
                                            d="M472.31,405.11,304.24,237a4,4,0,0,0-5.66,0L237,298.58a4,4,0,0,0,0,5.66L405.12,472.31a26,26,0,0,0,36.76,0l30.43-30.43h0A26,26,0,0,0,472.31,405.11Z">
                                        </path>
                                    </svg>
                                    <div className="flex-grow text-sm font-bold">Make your theme!</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div> */}
            {/*Old Change Language*/}
            {/* <div title="Change Language" className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
                    <MultilingualIcon/>
                    <ArrowDownIcon/>
                </div>
                <div
                    className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px mt-16 w-56 overflow-y-auto shadow-2xl">
                    <ul className="menu menu-compact gap-1 p-3" tabIndex={0}>
                        <li><button className="flex active"><img loading="lazy" width="20" height="20"
                                    alt="English"
                                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg"/>
                                <span className="flex flex-1 justify-between">English
                                </span></button>
                        </li>
                        <li><button className="flex"><img loading="lazy" width="20" height="20" alt="Español"
                                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg"/>
                                <span className="flex flex-1 justify-between">Español
                                </span></button>
                        </li>
                        <li><button className="flex"><img loading="lazy" width="20" height="20" alt="Français"
                                    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1eb-1f1f7.svg"/>
                                <span className="flex flex-1 justify-between">Français
                                </span></button>
                        </li>
                    </ul>
                </div>
            </div> */}

            {/* <span className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                data-tip="GitHub">
                <div className="flex-none items-center"><a aria-label="Github" target="_blank" rel="noreferrer" 
                        href="https://github.com/saadeghi/daisyui" rel="noopener"
                        className="btn btn-ghost drawer-button btn-square normal-case"><svg width="20"
                            height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                            className="inline-block h-5 w-5 fill-current md:h-6 md:w-6">
                            <path
                                d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z">
                            </path>
                        </svg></a></div>
            </span> */}
        </div>
        {/* Drawer */}
        <div className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)] lg:hidden" data-tip="Menu">
            <label htmlFor="drawer" className="btn btn-square btn-ghost drawer-button">
                <MenuIcon/>
            </label>
        </div>
    </nav>
</div>

  );
};
export default Navbar;