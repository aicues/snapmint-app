import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import type { DocumentProps } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

type Props = DocumentProps & {
  // add custom document props
}

class MyDocument extends Document<Props> {

  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   const locale = ctx.locale as string;
  //   const dir = locale === "ar" ? "rtl" : "ltr"
  //   console.log("_document locale "+locale +" "+ dir);
  //   return { ...initialProps, locale: ctx?.locale || "en" }
  // }
  
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale
    const dir = currentLocale === "ar" ? "rtl" : "ltr" // needs browser reload to take effect :( how to fix?
    return (
      <Html lang={this.props.locale} dir={dir}>
        <Head>
            <link rel="icon" href="/logo.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            {/* <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet"/> */}
            {currentLocale === "ar" ? (
              <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet"/>
            ):(
              <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
            )}
            {/* https://github.com/saadeghi/daisyui/issues/269#issuecomment-954951672 */}
            <link rel="stylesheet" type="text/css" href={`/${dir}.css`} />
        </Head>
        <body className='bg-base-100'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument