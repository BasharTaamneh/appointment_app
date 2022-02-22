import Head from 'next/head'
import { useAuth } from '../contexts/auth'
import Register from '../components/Register'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Heder'
import BGImage from '../components/BGImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function sign_up() {
  const { login, user } = useAuth()
  const router = useRouter()
  const [Show, setShow] = useState(false)

  useEffect(() => {
    if (user == null) {
        setShow(true)
    }
  })

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
          backgroundSize: `${BGImage()?.width}px  ${BGImage()?.height}px`,
        }}
      >
        <main
          className={
            user
              ? ' flex w-full flex-1 flex-col items-center justify-center text-center ' +
                'backdrop-blur-sm'
              : ' flex w-full flex-1 flex-col items-center justify-center text-center '
          }
        >
          {!user ? (
            <Register login={login} user={user} />
          ) : Show ? (
            <div className="animated fadeIn faster fixed inset-0  left-0  top-0 z-50 flex items-center  justify-center px-4 outline-none focus:outline-none">
              <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
              <div className="relative  mx-auto my-auto w-full max-w-lg rounded-xl bg-white p-5  shadow-lg ">
                {/* <!--content--> */}
                <div className="">
                  {/* <!--body--> */}
                  <div className="flex-auto justify-center bg-cover p-5 text-center">
                    <Image
                      src="/signed.png"
                      alt=""
                      width={'170%'}
                      height={'170%'}
                    />
                    <h2 className="py-4 text-xl font-bold ">
                      You already have an account and you are logged in!
                    </h2>
                    <p className="px-8 text-sm text-gray-500">
                      Do you want to log out and create a new account?
                    </p>
                  </div>
                  {/* <!--footer--> */}
                  <div className="mt-2  space-x-4 p-3 text-center md:block">
                    <button
                      className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                      onClick={() => {
                        router.push('./')
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="mb-2 rounded-full border border-green-500 bg-green-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-green-600 hover:shadow-lg md:mb-0"
                      onClick={() => {
                        localStorage.removeItem('auth')
                        router.reload()
                      }}
                    >
                      New Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}
