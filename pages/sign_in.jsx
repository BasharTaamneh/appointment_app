import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import Login from '../components/Login'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Heder'
export default function sign_in() {
  const { user, login } = useAuth()
  const router = useRouter()

  return (
    <>
      <Header />
      <Head>
        <title>Login page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex  flex-col items-center justify-center bg-gray-200 bg-cover "
        style={{
          backgroundImage: "url('./pulse_animation.gif')",
        }}
      >
        <main className="flex w-full flex-1 flex-col items-center justify-center  px-2 text-center ">
          {!user && <Login login={login} />}
          {user &&
            useEffect(function redirect() {
              router.push('./')
            })}
        </main>

        <Footer />
      </div>
    </>
  )
}
