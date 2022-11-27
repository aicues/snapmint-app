import { NextRequest, NextResponse } from 'next/server'
import countries from '@utils/countries.json'

// run only on homepage
export const config = {
  matcher: ['/', '/qafu-qatar/create', '/tokens/sym/claim']
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

  
  const freeGasCountries : string[] = ["QA", "AE", "SA", "US", "EG"] //, "US", "EG", "KW", "BH", "OM", "JO", "LB", "SY", "IQ", "YE", "PS", "IL", "TR", "CY", "GR", "RO", "BG", "MK", "AL", "RS", "ME", "BA", "HR", "SI", "AT", "CH", "DE", "NL", "BE", "LU", "FR", "ES", "PT", "AD", "MC", "SM", "VA", "IT", "LI", "MT", "PL", "SK", "CZ", "HU", "DK", "SE", "NO", "FI", "EE", "LV", "LT", "BY", "UA", "MD", "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ", "CN", "JP", "KR", "TW", "HK", "MO", "SG", "MY", "TH", "VN", "ID", "PH", "AU", "NZ", "FJ", "PG", "SB", "VU", "NC", "PF", "CK", "WS", "TO", "TV", "KI", "NU", "FM", "MH", "PW", "GU", "MP", "AS", "PR", "VI", "CA", "MX", "CR", "PA", "DO", "HT", "CU", "BS", "BB", "AG", "DM", "GD", "KN", "LC", "VC", "TT", "JM", "BZ", "SV", "HN", "NI", "GT", "BQ", "CW", "SX", "AW", "AI", "BM", "VG", "KY", "MS", "TC", "BM", "GL", "FO", "IS", "GB", "IE", "GG", "IM", "JE", "AX", "EE", "LV", "LT", "BY", "UA", "MD", "AM", "AZ", "GE", "KZ", "KG", "TJ", "TM", "UZ", "CN", "JP", "KR", "TW", "HK", "MO", "SG", "MY", "TH", "VN", "ID", "PH", "AU",

  const isFreeGasCountry = freeGasCountries.includes(country) ? "true" : "false";
  const inQatar = country === "QA" ? "true" : "false";

  url.searchParams.set('country', country)
  url.searchParams.set('countryName', countryName)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('currencyCode', currencyCode)
  url.searchParams.set('currencySymbol', currency.symbol)
  url.searchParams.set('name', currency.name)
  url.searchParams.set('lat', geo.latitude)
  url.searchParams.set('lon', geo.longitude)
  url.searchParams.set('isFreeGasCountry', isFreeGasCountry)
  url.searchParams.set('inQatar', inQatar)
  // url.searchParams.set('languages', languages)

  return NextResponse.rewrite(url)
}
