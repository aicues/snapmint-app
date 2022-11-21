/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ThirdwebWallet, SimpleWallet } from "./Wallets/Index";
import LocaleSwitcher from "./LocaleSwitcher"

import ComponentsIcon from '@icons/ComponentsIcon'
import ThemeIcon from '@icons/ThemeIcon'
import MenuIcon from '@icons/MenuIcon'
import MultilingualIcon from '@icons/MultilingualIcon'
import ArrowDownIcon from '@icons/ArrowDownIcon'


const Drawer = function Drawer() {

  return (
     
    <div className="drawer-side" style={{scrollBehavior: 'smooth', scrollPaddingTop: '5rem'}}>
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        {/* <aside className="menu p-4 overflow-y-auto bg-base-200 w-80"> */}
            <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2">
                <Link href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                    <div
                        className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                        <span className="lowercase">Snapmint</span>
                    </div>
                </Link>
            </div>
            <div className="h-4"></div>
            {/* Menu */}
            <ul className="menu menu-compact flex flex-col p-0 px-4">
                <li>
                    <a href="/docs/install" id="" className="flex gap-4   "><span
                            className="flex-none"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                            </svg>
                        </span>
                        <span className="flex-1">Install</span>
                    </a>
                </li>
            </ul>


        {/* </aside> */}
        </ul>
     </div>

  );
};
export default Drawer;