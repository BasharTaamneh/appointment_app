import Buyerland from '../components/Blanding'
import Header from '../components/Heder'
import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Sallerpage() {
  const Router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      Router.push('./sign_in')
    }
  })

  return (
    <>
      <Head>
        <title>Buyer Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {user && <Buyerland />}
      <Footer />
    </>
  )
}
