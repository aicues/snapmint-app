/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Link from "next/link";
import { ThirdwebWallet, SimpleWallet } from "./Wallets/Index";
// import { ConnectKitButton } from "connectkit";

import LocaleSwitcher from "./LocaleSwitcher"

import ComponentsIcon from '@icons/ComponentsIcon'
import ThemeIcon from '@icons/ThemeIcon'
import MenuIcon from '@icons/MenuIcon'
import MultilingualIcon from '@icons/MultilingualIcon'
import ArrowDownIcon from '@icons/ArrowDownIcon'

import {Button, Drawer, Menu, Navbar } from "react-daisyui";

import { useAddress } from "@thirdweb-dev/react";

import Logo from '@icons/logo-dark.svg'
// import Logo_bold from '@icons/logo-dark-bold.svg'


const NavbarX = function NavbarX() {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => { setVisible(!visible) }
    const address = useAddress();

  return (
    <>
    <Drawer side="right"
        open={visible}
        onClickOverlay={toggleVisible}
        className="font-sans">
            <Navbar>
                <div className="flex-none lg:hidden">
                    <Button shape="square" color="ghost" onClick={toggleVisible}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-6 h-6 stroke-current"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </Button>
                </div>
                <div className="flex-1 px-2 mx-2">Navbar Title</div>
                <div className="flex-none hidden lg:block">
                    <Menu horizontal={true}>
                        <Menu.Item>
                        <a>Navbar Item 1</a>
                        </Menu.Item>
                        <Menu.Item>
                        <a>Navbar Item 2</a>
                        </Menu.Item>
                    </Menu>
                </div>
            </Navbar>

    </Drawer>
    </>

  );
};
export default NavbarX;