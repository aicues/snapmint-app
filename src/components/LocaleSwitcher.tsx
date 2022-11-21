import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu } from 'react-daisyui'
// import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export async function getStaticProps({ locale } :{ locale: string }) {
//   return { props: { 
//       ...(await serverSideTranslations(locale, ["common"]))}
//       };
// }
export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  )

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale }).then(() => router.reload())
  }
  // const { t } = useTranslation('common')

  return (
    // <div>

      <>
      {/* <Menu className="bg-base-100"> */}
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router
          return (
            // <Menu.Item key={locale}>
            <span key={locale} >
              <Link href={{ pathname, query }} as={asPath} locale={locale} onClick={() => onToggleLanguageClick(locale)} className="rounded-lg mx-2">
                {/* <MultilingualIcon/>  */}
                {locale === "en" ? "English" : locale === "ar" ? "عربى" : null}
              </Link>
            </span>
            // </Menu.Item>
          )
        })}
      {/* </Menu> */}
      </>
    // </div> 



    // <div>
    //   {/* <p>{t('change-locale')}</p> */}
    //   <ul>
    //     {otherLocales.map((locale) => {
    //       const { pathname, query, asPath } = router
    //       return (
    //         <li key={locale}>
    //           <Link href={{ pathname, query }} as={asPath} locale={locale} onClick={() => onToggleLanguageClick(locale)} className="btn btn-ghost drawer-button normal-case">
    //             <MultilingualIcon/> {locale === "en" ? "English" : locale === "ar" ? "عربى" : null}
    //           </Link>
    //         </li>
    //       )
    //     })}
    //   </ul>
    // </div>
  )
}