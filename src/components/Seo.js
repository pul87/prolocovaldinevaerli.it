import React from 'react'
import { withPrefix } from 'gatsby'

const siteTitle = 'Proloco Erli'
const siteDescription =
  'Trekking, outdoor eventi e promozione turistica del comune dei Erli, ALta Val Neva, Liguria'
const siteUrl = 'https://prolocovaldinevaerli.it'
const defaultKeywords =
  'erli,italia,savona,turismo,trekking,outdoor,proloco,eventi'

const Seo = ({
  title,
  description = siteDescription,
  keywords = defaultKeywords,
  titleSuffix = siteTitle,
  image = '/img/vista-erli-pale-eoliche.jpg',
  pathname = '/',
}) => {
  const pageTitle = title
    ? titleSuffix
      ? `${title} | ${titleSuffix}`
      : title
    : siteTitle
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${withPrefix(image)}`
  const pageUrl = pathname.startsWith('http') ? pathname : `${siteUrl}${pathname}`

  return (
    <>
      <html lang="it" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
    </>
  )
}

export default Seo
