import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import Image from 'next/image'
import Errmsg from './errormsg'
export default function Login({ login }) {
  const router = useRouter()
  const [message, setmessage] = useState()
  const baseUrl = process.env.API_URL
  const tokenUrl = baseUrl + 'users/login'

  async function handler(e) {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value
    NProgress.start(true)
    await axios
      .post(tokenUrl, { username, password })
      .then((response) => {
        login(response)
        router.push('./')
      })
      .catch((err) => (err ? setmessage(err.response.data.message) : message))
  }
  return (
    <>
      <div className="min-h-2/4 flex h-auto w-full justify-center rounded-lg px-2 py-32 shadow-slate-700 sm:w-auto sm:py-16  md:py-48 lg:w-8/12  xl:w-8/12">
        <div
          className="hidden h-auto w-full rounded-l-lg bg-cover pr-4 shadow-2xl shadow-slate-700 md:w-11/12 lg:block lg:w-5/12 "
          style={{
            backgroundImage: "url('./authentication.png')",
          }}
        ></div>

        <div className="xs:rounded-l-lg h-auto w-auto rounded-r-lg rounded-l-lg bg-white p-5 shadow-2xl  shadow-slate-700 sm:rounded-l-lg  md:rounded-l-lg lg:w-7/12 lg:rounded-l-none">
          <div className="flex  items-center justify-center text-3xl font-semibold text-gray-700 ">
            <div className="mx-2 flex ">
              <h1>Brand</h1>
            </div>

            <div className="flex animate-pulse py-2">
              <Image src="/logo.png" alt="logo" width={'30%'} height={'30%'} />
            </div>
          </div>
          <form
            className="mb-4 rounded bg-white px-8 pt-6 pb-8 "
            onSubmit={(e) => handler(e)}
          >
            {message == 'Invalide username !' && Errmsg(message)}

            {message == 'Invalide password !' && Errmsg(message)}

            {message == '' && (
              <div className=" mb-4 h-2 w-2 border-separate animate-ping rounded-lg border-2 border-blue-700 bg-blue-600 text-lg text-red-500 shadow-xl ">
                {message}
              </div>
            )}
            <div className="mb-4 md:mr-2 md:mb-0">
              <input
                onChange={() => setmessage('')}
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none "
                id="firstName"
                type="text"
                placeholder="username"
                name="username"
                required
              />
            </div>

            <div className="mb-8 md:mr-2 ">
              <input
                onChange={() => setmessage('')}
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                minLength="8"
                required
              />
            </div>

            <div className="mb-6 text-center">
              <button
                className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submet"
              >
                LOG IN
              </button>
            </div>
          </form>
          <hr className="mb-4 border-2 border-t" />
          <div className="inline-block text-center align-baseline text-sm text-blue-500 hover:animate-pulse hover:text-blue-800 ">
            <button
              type="button"
              className="hover:underline"
              onClick={() => router.push('./sign_up')}
            >
              <p>Create an account? </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
