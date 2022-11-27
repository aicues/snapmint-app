
// import NavbarX from "@components/Navbar";
// import Navbar from "@components/Navbar-2";
// import Drawer from "@components/Drawer";
import {Button, Drawer, Menu, Navbar } from "react-daisyui";
import Footer from "@components/Footer";
import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";



import LocaleSwitcher from "./LocaleSwitcher";
import ThirdwebWallet from "./Wallets/ThirdwebWallet";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '@public/logo-dark.svg'
// import Logo_bold from '@public/logo-dark-bold.svg'
import Qafu from '@public/icons/qq.svg'
import Sym from '@public/icons/sym.svg'
import Mondo from '@public/icons/mondo.svg'
import User from '@public/icons/user.svg'
import GeneralIcon from '@public/icons/general.svg'


interface LayoutProps {
    children: JSX.Element
  }

  const Layout = ({ children }: LayoutProps) => {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => { setVisible(!visible) }
    const address = useAddress();
  
    // Translations
    const { t }= useTranslation('common');

    const mobileMenu = (

        <Menu className="bg-base-300 w-[80%] shadow-xl p-2 rounded-box">
        <Menu.Item>
            <Link href="/" aria-current="page" aria-label="Homepage" className="btn btn-ghost px-0 place-items-start">
                <div className="text-primary text-lg transition-all duration-200 mb-8">
                    <Logo className="inline-block h-8 w-full fill-current"/>
                </div>
            </Link>
            
        </Menu.Item>
        <Menu.Title>
          <span>Tokens</span>
        </Menu.Title>
        <Menu.Item>
            <Link href="/tokens/sym/" className="rounded-lg mx-2">
                <Sym className="inline-block h-4 w-4 fill-primary m-0 md:h-5 md:w-5"/>
                {t('menu.sym')}
            </Link>
        </Menu.Item>
        <Menu.Title>
          <span>NFT Collections</span>
        </Menu.Title>
        <Menu.Item>
            <Link href="/qafu-qatar/" className="rounded-lg mx-2">
                <Qafu className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                {t('menu.qafu')}
            </Link>
        </Menu.Item>
        <Menu.Item>
            <Link href="/mondo/" className="rounded-lg mx-2">
                <Mondo className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                {t('menu.mondo')}
            </Link>
        </Menu.Item>
        
        <Menu.Item>
            <Link href="/market/" className="rounded-lg mx-2">
                <GeneralIcon className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                {t('menu.market')}
            </Link>
        </Menu.Item>
        <Menu.Title>
          <span>Tools</span>
        </Menu.Title>
        <Menu.Item>
            <Link href="/my/assets/" className="rounded-lg mx-2">
                <User className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                {t('menu.assets')}
            </Link>
        </Menu.Item>
        
        {/* <Menu.Item>
            <LocaleSwitcher/>
        </Menu.Item> */}

        <Menu.Item className="[&_span]:p-0 [&_span]:normal-case [&_span]:text-white">
            <ThirdwebWallet/>
        </Menu.Item>
      </Menu>

    )

    

    return (

        <>
        <Drawer side={mobileMenu}
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
                                    <Qafu className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                                    {t('menu.qafu')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/mondo/" className="rounded-lg mx-2">
                                    {/* <ComponentsIcon/> */}
                                    <Mondo className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                                    {t('menu.mondo')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/tokens/sym/" className="rounded-lg mx-2">
                                    {/* <ComponentsIcon/> */}
                                    <Sym className="inline-block h-4 w-4 fill-current hover:fill-primary m-0 md:h-5 md:w-5"/>
                                    {t('menu.sym')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item >
                                <Link href="/market/" className="rounded-lg mx-2">
                                    <GeneralIcon className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                                    {t('menu.market')}
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/my/assets/" className="rounded-lg mx-2">
                                    <User className="inline-block h-4 w-4 fill-current m-0 md:h-5 md:w-5"/>
                                    {t('menu.assets')}
                                </Link>
                            </Menu.Item>
                            {/* <Menu.Item>
                                <LocaleSwitcher/>
                            </Menu.Item> */}
                            {/* ref: https://stackoverflow.com/a/74041904 */}
                            <Menu.Item className="[&_span]:p-0 [&_span]:normal-case [&_span]:text-white" > 
                                <ThirdwebWallet/>
                            </Menu.Item>                              
                        </Menu>
                        </div>
                    {/* </div> */}
                </Navbar>
            </div>
            <div className="min-h-screen bg-base-200">
                {/* <section className="bg-base-200 flex flex-col md:flex-row sm:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max"> */}
                    {children}
            </div>
                {/* </section> */}
                <Footer />
                <ToastContainer autoClose={8000} />
                {/* drawer-side */}
                {/* <div>ahjshjashjaha</div> */}
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