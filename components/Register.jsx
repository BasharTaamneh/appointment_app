import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import Image from 'next/image'
import Errmsg from './errormsg'
import Warnmsg from './warnmsg'

export default function Register({ login }) {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const registerUrl = baseUrl + 'users/register'
  const tokenUrl = baseUrl + 'users/login'
  const [Pflag, setPflag] = useState(false)
  const [Flag, setFlag] = useState(false)
  const [Userflag, setUserflag] = useState(false)
  const [Emailflag, setEmailflag] = useState(false)
  console.log(baseUrl)
  async function handler(e) {
    e.preventDefault()
    setFlag(true)
    const username = e.target.username.value
    const password1 = e.target.password.value
    const password2 = e.target.c_password.value
    const account_type = e.target.account_type.value
    const email = e.target.email.value

    const data = {
      username: username,
      password: password1,
      account_type: account_type,
      email: email,
    }

    if (password1 != password2) {
      setPflag(true)
    }

    if (password1 == password2) {
      setPflag(false)
      NProgress.start(true)
      await axios
        .post(registerUrl, data)
        .then(async (response) => {
          if (response.status == 200) {
            NProgress.start(true)
            await axios
              .post(tokenUrl, { username: username, password: password1 })
              .then((response) => {
                if (response.status == 200) login(response)
                setTimeout(() => {
                  router.push('./')
                }, 500)
              })
              .catch((err) =>
                err.response != undefined
                  ? console.log(err.response.data.message)
                  : console.log('')
              )
          }
        })
        .catch((err) =>
          err.response != undefined
            ? err.response.data.message.includes('email') &&
              err.response.data.message.includes('username')
              ? (setEmailflag(true), setUserflag(true), setFlag(false))
              : err.response.data.message.includes('username')
              ? (setUserflag(true), setFlag(false))
              : err.response.data.message.includes('email')
              ? (setEmailflag(true), setFlag(false))
              : Emailflag
            : (setEmailflag(false), setUserflag(false), setFlag(true))
        )
    }
  }

  return (
    <>
      <div className="flex  h-auto w-auto justify-center px-2 py-32 lg:w-10/12 xl:w-3/4">
        <div className="w-auto rounded-lg  max-w-6xl bg-white p-1 shadow-2xl shadow-slate-700 lg:w-10/12 ">
          <div className="my-2 flex items-center justify-center text-3xl font-semibold text-gray-700 ">
            <div className="flex animate-pulse py-2">
              <Image src="/logo.png" alt="logo" width={'45%'} height={'45%'} />
            </div>
          </div>
          <form
            className="mb-4 rounded bg-white px-8 pt-6 pb-8"
            onSubmit={(e) => handler(e)}
          >
            <label
              className="float-left mb-2 block animate-pulse text-sm font-bold text-gray-600"
              htmlFor="account_type"
            >
              Account Type
            </label>
            <select
              id="account_type"
              name="account_type"
              type="select"
              required
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm font-semibold leading-tight text-gray-700 shadow focus:outline-none"
            >
              <option value="buyer"> Buyer</option>
              <option value="seller"> Seller </option>
            </select>
            {Userflag && Warnmsg('username already exists ❕ 😅')}
            <div className="mb-2">
              <input
                onChange={() => setUserflag(false)}
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                id="usernam"
                type="text"
                placeholder="Username"
                name="username"
                required
              />
            </div>
            {Emailflag && Warnmsg('Email already exists ❕ 😅')}
            <div className="mb-2">
              <input
                onChange={() => setEmailflag(false)}
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </div>
            {Pflag ? (
              Errmsg('Password not matches ❌')
            ) : Flag ? (
              <div className=" mb-4 w-auto animate-pulse rounded-lg border  border-green-600  text-lg text-green-500 shadow-xl ">
                Registering ...
              </div>
            ) : (
              <></>
            )}
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none lg:w-64 xl:w-80 2xl:w-96"
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="off"
                  minLength="8"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="md:ml-2">
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3  py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none lg:w-64 xl:w-80 2xl:w-96"
                  id="c_password"
                  type="password"
                  name="c_password"
                  autoComplete="off"
                  minLength="8"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            </div>
            <div className="mb-6 text-center text-lg">
              <button
                className="focus:shadow-outline w-10/12 rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <hr className="mb-6  border-2 border-t" />

            <div className="inline-block text-center align-baseline text-sm text-blue-500 hover:animate-pulse hover:text-blue-800 ">
              <button
                type="button"
                className="hover:underline"
                onClick={() => router.push('../sign_in')}
              >
                Already have an account? Login!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
