import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import Register from '../components/Register'
import Footer from '../components/Footer'
import Header from '../components/Heder'
import { useEffect, useState } from 'react'
import Logeduser from '../components/logeduser'
export default function sign_up() {
  const { login } = useAuth()
  const [Show, setShow] = useState(false)

  useEffect(() => {
    if ('auth' in localStorage) {
      setTimeout(() => {
        setShow(true)
      }, 2000)
    }
  })

  function Showsetter() {
    setShow(false)
  }

  return (
    <>
      <Header />
      <Head>
        <title>Register page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex min-h-screen flex-col items-center  justify-center bg-gray-200 bg-cover  "
        style={{
          backgroundImage: "url('./pulse_animation.gif')",
        }}
      >
        <main className=" flex w-full flex-1 flex-col items-center justify-center text-center ">
          <Register login={login} />
          {Show && <Logeduser Showsetter={Showsetter} />}
        </main>
      </div>
      <Footer />
    </>
  )
}
