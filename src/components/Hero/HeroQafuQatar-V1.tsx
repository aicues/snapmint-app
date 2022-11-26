import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import {Hero, Card, Table, Button} from "react-daisyui";

import HeroImg from '@public/images/qq-hero-img-1.png'
import HeroBg from '@public/images/qq-hero-bg-1.png'
import HeroTitle from '@public/images/qq-title-1.png'
const HeroQafuQatar = function HeroQafuQatar() {

    const { t } = useTranslation('common');

    return (
        <Hero 
            className="hero min-h-fit text-primary place-items-start"
            style={{ backgroundImage: `url(/images/qq-hero-bg-1.png)`}}
        >
            <Hero.Overlay className='bg-opacity-0' />

            <Hero.Content className="p-4 container mx-auto lg:px-28 md:px-20 sm:px-8 lg:my-20 md:my-14 sm:my-8">
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full pt-4'>
                    {/* Call out */}
                    <Card compact={true} bordered={false} className='order-last md:order-first lg:order-first'>
                        <Card.Image src={HeroTitle.src} alt="Qafu Qatar" className='pt-4 pr-10' >
                        </Card.Image> 
                        
                        <Card.Title className="text-white place-items-start flex flex-col">
                            {/* <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-7xl mb-2">
                                {t('qafu.title')}
                            </h1> */}
                            <h4 className="text-white/60 font-extrabold text-lg sm:text-2xl lg:text-3xl">
                                {t('qafu.sub-title')}
                            </h4>
                        </Card.Title>
                        <Card.Body className='!p-0 !pb-2'>
                            <ul className="steps steps-vertical text-lg text-white">
                                {/* https://github.com/saadeghi/daisyui/issues/825#issuecomment-1141952076 */}
                                <li data-content="1" className="step after:!w-6 after:!h-6 !min-h-8">{t('qafu.step-1')}</li>
                                <li data-content="2" className="step after:!w-6 after:!h-6 !min-h-8">{t('qafu.step-2')}</li>
                                <li data-content="3" className="step after:!w-6 after:!h-6 !min-h-8">{t('qafu.step-3')}</li>
                            </ul>
                            <p> </p>
                            <Card.Actions className="justify-end">
                                <div className="flex flex-1 space-x-2 lg:justify-start">
                                <Button responsive animation color={"accent"} size={"lg"} href="/qafu-qatar/create">
                                    {t('qafu.cta-button')}
                                </Button>
                                <Button responsive animation color={"ghost"}  variant={"outline"} size={"lg"} href="/qafu-qatar/info">
                                    {t('qafu.info-button')}
                                </Button>
                                </div>
                            </Card.Actions>
                        </Card.Body>
                    </Card>
                    {/* Image */}
                    <Card compact={true} bordered={false} className="[&.card]:before:opacity-0 order-first md:order-last lg:order-last">
                    <Card.Image className='p-2'
                        src={HeroImg.src}
                        alt="Qafu Qatar"
                    />
                    <Card.Body></Card.Body>
                    </Card>
                </div>

            </Hero.Content>
        </Hero>
    );
}

export default HeroQafuQatar;
