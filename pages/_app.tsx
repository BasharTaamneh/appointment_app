import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import Router from 'next/router'
import NProgress from 'nprogress'
import Loader from '../components/Loader'
import { useEffect, useState } from 'react'

function Brand({ Component, pageProps }: AppProps) {

  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      NProgress.start();
      setLoading(true)
    })
    Router.events.on('routeChangeComplete', (url) => {
      NProgress.done();
      setLoading(false)
    })
  }, [])


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color</meta>" content="#ffffff" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        {/* Fonts and icons */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      {Loading && <Loader />}
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default Brand
