import Image from 'next/image'

const HeroHome = function HeroHome() {

    return (
        <div className="hero min-h-screen text-primary grid place-items-start" style={{ backgroundImage: `url("/images/hero_static_qatar_v1.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content mx-auto flex flex-col md:flex-row place-items-start px-2 my-2 md:my-24">
                <div className="flex flex-col w-full lg:w-1/2 justify-center place-items-start pt-0 pb-4 px-0">
                {/* <div className="mb-2 py-4 text-center lg:py-10 lg:text-left"> */}
                    <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl">Qafu Qatar</h1>
                    <h2 className="font-title text-lg font-extrabold sm:text-2xl lg:text-3xl">The most popular,
                        free and open-source <br />Tailwind CSS component library</h2>
                {/* </div> */}
                </div> 
                
                
                {/* <div className="divider lg:divider-horizontal"></div>  */}
                <div className="w-full lg:w-1/2 lg:py-2 place-items-start">
                    <Image 
                        alt='' 
                        width={400}
                        height={300}
                        // layout='responsive'
                        src="https://pbs.twimg.com/media/FgL8z-FXwAAROMN?format=jpg&name=large"
                        className="max-w-sm rounded-lg shadow-2xl" />
                </div>
            </div>

        </div> 
    );
}

export default HeroHome;


// <div className="hero min-h-screen text-primary -mt-[4rem] grid " style={{ backgroundImage: `url("/images/hero_static_qatar_v1.jpg")` }}>
// <div className="hero-overlay bg-opacity-60"></div>
// <div className="hero-content flex flex-col w-full lg:flex-row place-items-start">
//     <div className="grid mb-2 py-4 text-center lg:py-2 lg:text-left flex-grow place-items-start">
//     <div className="mb-2 py-4 text-center lg:py-10 lg:text-left"> 
//         <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl">daisyUI</h1>
//         <h2 className="font-title text-lg font-extrabold sm:text-2xl lg:text-3xl">The most popular,
//             free and open-source <br />Tailwind CSS component library</h2>
//     </div>
//     </div> 
//     <div className="divider lg:divider-horizontal"></div> 
//     <div className="grid flex-grow place-items-start">
//         <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
//     </div>
// </div>

// </div> 



////////////////////////////////////////////////////////////


// <div className="hero-content col-start-1 row-start-1 w-full max-w-7xl flex-col justify-between gap-10 pb-40  lg:items-end lg:gap-0 xl:gap-20 lg:flex-row-reverse">
                
// <div className="w-full min-w-[330px] max-w-[350px] h-[100px]">
//     <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
// </div>
// {/*  */}
// <div className="lg:pl-10 lg:pb-32">
// <div className="mb-2 py-4 text-center lg:py-10 lg:text-left">
//     <h1 className="font-title mb-2 text-4xl font-extrabold sm:text-5xl lg:text-7xl">daisyUI</h1>
//     <h2 className="font-title text-lg font-extrabold sm:text-2xl lg:text-3xl">The most popular,
//         free and open-source <br />Tailwind CSS component library</h2>
// </div>
// <div
//     className="flex w-full flex-col items-center space-y-10 lg:flex-row lg:items-start lg:space-x-4 lg:space-y-0">
//     <div className="my-2 flex max-w-sm flex-col gap-2 text-left">
//         <div className="flex gap-2"><svg width="20" height="20"
//                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                 className="inline-block h-6 w-6 stroke-current">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//             A plugin for Tailwind CSS</div>
//         <div className="flex gap-2"><svg width="20" height="20"
//                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                 className="inline-block h-6 w-6 stroke-current">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//             Faster development</div>
//     </div>
// </div>
// {/* <!-- btns --> */}
// <div className="mt-4 flex flex-1 justify-center space-x-2 lg:mt-6 lg:justify-start"><a
//         href="/components"
//         className="btn btn-ghost btn-active lg:btn-lg normal-case"><span
//             className="hidden sm:inline">See components</span>
//         <span className="inline sm:hidden">Components</span></a>
//     <a href="/docs/install" className="btn lg:btn-lg normal-case">How to
//         use?</a>
// </div>
// </div>
// {/*  */}
// <div>

// </div>
// </div>