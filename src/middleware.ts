import { NextRequest, NextResponse } from 'next/server'
import countries from '@utils/countries.json'

// run only on homepage
export const config = {
  matcher: ['/', '/qafu-qatar/create']
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'

  const countryInfo = countries.find((x) => x.cca2 === country)
  const countryNameIndex = Object.keys(countryInfo.countryName)[0]
  const countryName = countryInfo.countryName[countryNameIndex]

  const currencyCode = Object.keys(countryInfo?.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  // const languages = Object.values(countryInfo.languages).join(', ')

  url.searchParams.set('country', country)
  url.searchParams.set('countryName', countryName)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('currencySymbol', currency.symbol)
  url.searchParams.set('name', currency.name)
  url.searchParams.set('lat', geo.latitude)
  url.searchParams.set('lon', geo.longitude)
  // url.searchParams.set('languages', languages)

  return NextResponse.rewrite(url)
}
