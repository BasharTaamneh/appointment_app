import { useRouter } from 'next/router'
import { useState } from 'react'
import Authaxios from './Authaxios'
import Errmsg from './errormsg'
import Warnmsg from './warnmsg'
import Succmsg from './sucssmsg'
import {mutate} from 'swr'
export default function Updateaccount({
  Accupdshowsetter,
  email,
  username,
  account,
}) {
  mutate()
  const Router = useRouter()
  const [Success, setSuccess] = useState(false)
  const [Incorrect, setIncorrect] = useState(false)
  const [Existname, setExistname] = useState(false)
  const [Existemail, setExistemail] = useState(false)
  const [oldPassword, setoldPassword] = useState('')
  const [Newpassword, setNewpassword] = useState(null)
  const [Username, setUsername] = useState(username)
  const [Email, setEmail] = useState(email)
  const userupdateURL = '/users/user-update'

  async function SuccessHandler() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 8000)
    setTimeout(() => Accupdshowsetter(), 1000)
  }

  const data = {
    oldPassword: oldPassword,
    username: Username,
    email: Email,
  }

  if (Newpassword) {
    data['password'] = Newpassword
  }

  async function Accupdhandler(e) {
    e.preventDefault()

    await Authaxios()
      .put(userupdateURL, data)
      .then((response) => {
        if (response) {
          SuccessHandler()
        }
      })
      .catch((err) => {
        err && err.response.data.message == 'Current Password Incorrect !'
          ? setIncorrect(true)
          : err.response.data.message.includes('email') &&
            err.response.data.message.includes('username')
          ? (setExistemail(true), setExistname(true))
          : err.response.data.message.includes('email')
          ? setExistemail(true)
          : err.response.data.message.includes('username')
          ? setExistname(true)
          : err.response.data.message.includes('jwt') ||
            (error.response.data.message.includes('Token') &&
              (localStorage.removeItem('auth'), Router.reload()))
      })
  }

  return (
    <>
      {/* create store form */}
      <div>
        <div
          className="fixed left-0 top-12 flex  min-h-screen w-full items-center justify-center bg-gray-500 bg-opacity-40  shadow-xl backdrop-blur-sm backdrop-filter sm:top-12 md:top-20 lg:top-20 xl:top-20 
        "
        >
          <div className=" mx-auto mb-24 h-full w-11/12 max-w-5xl items-center justify-center py-2  ">
            {Success ? (
              Succmsg(
                Username.toUpperCase() +
                  ' profile has been successfully updated 😎'
              )
            ) : (
              <div className="min-w-screen animated fadeIn faster top-24 z-50 mx-auto flex h-auto items-center justify-center  bg-center bg-no-repeat outline-none focus:outline-none">
                <div className="absolute top-24 mx-auto "></div>
                <div className="relative  mx-auto my-auto w-full max-w-lg rounded-xl bg-white p-5  shadow-lg ">
                  {/* <!--content--> */}
                  <div>
                    {/* <!--body--> */}
                    <div className="m-2 mx-auto flex w-full items-center justify-center font-serif text-lg">
                      <p>{account.toUpperCase()} ACCOUNT</p>
                    </div>
                    <form onSubmit={(e) => Accupdhandler(e)}>
                      <div>
                        <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                          Optional
                        </p>
                        <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                          <input
                            className="flex"
                            onChange={(e) => {
                              setUsername(e.target.value), setExistname(false)
                            }}
                            className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                            id="Username"
                            type="text"
                            defaultValue={username}
                            name="Username"
                          />
                        </div>
                      </div>
                      {Existname && Warnmsg(Username + ' already exists ❕ 😅')}
                      <div>
                        <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                          Optional
                        </p>
                        <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                          <input
                            className="flex"
                            onChange={(e) => {
                              setEmail(e.target.value), setExistemail(false)
                            }}
                            className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                            id="Email"
                            type="email"
                            defaultValue={email}
                            name="Email"
                          />
                        </div>
                      </div>
                      {Existemail && Warnmsg(Email + ' already exists ❕ 😅')}
                      <div>
                        <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                          Optional
                        </p>
                        <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                          <input
                            className="flex"
                            onChange={(e) => {
                              setNewpassword(e.target.value)
                            }}
                            className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                            id="Newpassword"
                            type="password"
                            placeholder="New Password"
                            name="Newpassword"
                            minLength={8}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="mt-3 flex items-center justify-end px-1 text-sm text-red-500">
                          Required
                        </p>
                        <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                          <input
                            className="flex"
                            onChange={(e) => {
                              setoldPassword(e.target.value),
                                setIncorrect(false)
                            }}
                            className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                            id="oldPassword"
                            type="password"
                            placeholder="Current Password"
                            name="oldPassword"
                            minLength={8}
                            required
                          />
                        </div>
                        {Incorrect &&
                          Errmsg('Current Password Incorrect 😅 ❗')}
                      </div>
                      {/* <!--footer--> */}
                      <div className="mt-2  space-x-4 p-3 text-center md:block">
                        <button
                          type="button"
                          onClick={() => {
                            Accupdshowsetter()
                          }}
                          className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mb-2 rounded-full border border-green-500 bg-green-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-green-600 hover:shadow-lg md:mb-0"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* create store form */}
    </>
  )
}
