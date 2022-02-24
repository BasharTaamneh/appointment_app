import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import Sallerland from '../components/Slanding'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Heder'
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
        <title>Saller Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {user && <Sallerland />}
      <Footer />
    </>
  )
}
