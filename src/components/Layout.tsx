
// import NavbarX from "@components/Navbar";
// import Navbar from "@components/Navbar-2";
// import Drawer from "@components/Drawer";
import {Button, Drawer, Menu, Navbar } from "react-daisyui";
import Footer from "@components/Footer";
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

import ComponentsIcon from '@icons/ComponentsIcon'
import ThemeIcon from '@icons/ThemeIcon'
import MenuIcon from '@icons/MenuIcon'
import MultilingualIcon from '@icons/MultilingualIcon'
import ArrowDownIcon from '@icons/ArrowDownIcon'

import LocaleSwitcher from "./LocaleSwitcher";
import ThirdwebWallet from "./Wallets/ThirdwebWallet";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '@icons/logo-dark.svg'
import Qafu from '@icons/q.svg'
// import Logo_bold from '@icons/logo-dark-bold.svg'

interface LayoutProps {
    children: JSX.Element
  }

  const Layout = ({ children }: LayoutProps) => {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => { setVisible(!visible) }
    const address = useAddress();
    
    // Translations
    const { t }= useTranslation('common');
    return (

        <>
        <Drawer side=""
            open={visible}
            onClickOverlay={toggleVisible}
            className="bg-base-300"
            contentClassName="scroll-smooth scroll-pt-20"
        >
            <div className="\n  sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 \n  text-primary-content\n  ">
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
                    {/* Logo */}
                    <div className="flex-1 px-6 mx-0">
                        <Link href="/" aria-current="page" aria-label="Homepage" className="btn btn-ghost px-2">
                            <div className="text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                                <Logo className="inline-block h-8 w-full fill-current md:mr-2"/>
                            </div>
                        </Link>
                    </div>
                    {/* Menu */}
                    {/* <div className="flex flex-1 md:gap-1 lg:gap-2"> */}
                        <div className="flex-none hidden lg:block">
                        <Menu horizontal={true} className="p-0">
                            <Menu.Item>
                                <Link href="/qafu-qatar/" className="rounded-lg mx-2">
                                    {/* <ComponentsIcon/> */}
                                    <Qafu/>
                                    {t('menu.qafu')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/market/" className="rounded-lg mx-2">
                                    <ComponentsIcon/>
                                    {t('menu.market')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/my/assets/" className="rounded-lg mx-2">
                                    <ComponentsIcon/>
                                    {t('menu.assets')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <LocaleSwitcher/>
                            </Menu.Item>
                            {/* ref: https://stackoverflow.com/a/74041904 */}
                            <Menu.Item className="[&_span]:p-0 [&_span]:normal-case [&_span]:text-white" > 
                                <ThirdwebWallet/>
                            </Menu.Item>                              
                        </Menu>
                        </div>
                    {/* </div> */}
                </Navbar>
            </div>
                {/* <section className="bg-base-200 flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max"> */}
                    {children}
                {/* </section> */}
                <Footer />
                <ToastContainer autoClose={8000} />
                {/* drawer-side */}
        </Drawer>
        </>


        // <div className="bg-base-300 drawer">
        //     <input id="drawer" type="checkbox" className="drawer-toggle"></input>
        //     <div className="drawer-content" style={{scrollBehavior: 'smooth', scrollPaddingTop: '5rem'}}>
        //         <Navbar/>
        //         <main>{children}</main>
        //         <Footer />
        //     </div>
        //     <Drawer />
        // </div>
    )
  }
  
  export default Layout