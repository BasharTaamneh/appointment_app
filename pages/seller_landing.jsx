import Head from 'next/head'
import { useAuth } from '../contexts/auth'
// import sign_in from './sign_in'
import Sallerland from '../components/Slanding'
// import Profile from '../components/Profile'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Heder'
export default function Sallerpage() {
  const Router = useRouter()
  const { user } = useAuth()

  return (
    <>
      <Head>
        <title>Saller Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {user ? (
        <Sallerland />
      ) : (
        useEffect(() => {
          Router.push('./sign_in')
        }, [])
      )}
      <Footer />
    </>
  )
}
