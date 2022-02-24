import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import Authaxios from './Authaxios'
import Errmsg from './errormsg'
import { mutate } from 'swr'

export default function Deleteaccount({ Accdelshowsetter }) {
  mutate()
  const Router = useRouter()
  const [Success, setSuccess] = useState(false)
  const [Incorrect, setIncorrect] = useState(false)
  const [oldPassword, setoldPassword] = useState('')
  const userdeleteURL = '/users/user-delete'

  async function SuccessHandler() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 10000)
    localStorage.clear()
    setTimeout(() => Router.reload(), 1000)
  }

  async function Accdelhandler(e) {
    e.preventDefault()
    await Authaxios()
      .delete(userdeleteURL, {
        data: { oldPassword: oldPassword },
      })
      .then((response) => {
        if (response) {
          SuccessHandler()
        }
      })
      .catch((err) => {
        err && err.response.data.message == 'Current Password Incorrect !'
          ? setIncorrect(true)
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
          className="fixed left-0 top-12 flex  min-h-screen w-full items-center justify-center bg-red-400 bg-opacity-20  shadow-xl backdrop-blur-sm backdrop-filter sm:top-12 md:top-20 lg:top-20 xl:top-20 
        "
        >
          <div className=" mx-auto mb-24 h-full w-11/12 max-w-5xl items-center justify-center py-2  ">
            {Success ? (
              <div className="mx-auto items-center justify-center">
                <p className="text-shadow mx-auto flex w-full items-center  justify-center bg-transparent px-1 py-1 text-3xl font-semibold text-white">
                  Goodbye
                </p>
                <div className="mx-auto flex items-center justify-center  bg-cover ">
                  <div className=" ">
                    <Image
                      className="flex rounded-full"
                      src="/goodbye.gif"
                      width={'500%'}
                      height={'500%'}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="min-w-screen animated fadeIn faster top-24 z-50 mx-auto flex h-auto items-center justify-center  bg-center bg-no-repeat outline-none focus:outline-none"
                id="modal-id"
              >
                <div className="absolute top-24 mx-auto "></div>
                <div className="relative  mx-auto my-auto w-full max-w-lg rounded-xl bg-white p-5  shadow-lg ">
                  {/* <!--content--> */}
                  <div className="">
                    {/* <!--body--> */}
                    <div className="flex-auto justify-center p-5 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="-m-1 mx-auto flex h-7 w-7 items-center text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto flex h-20 w-20 items-center text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="py-4 text-xl font-bold ">Are you sure?</h3>
                      <p className="px-8 text-sm text-gray-500">
                        Do you really want to delete your account? This process
                        cannot be undone
                      </p>
                    </div>
                    <form onSubmit={(e) => Accdelhandler(e)}>
                      <div>
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
                      </div>
                      {Incorrect && Errmsg('Current Password Incorrect ❗ 😅')}
                      {/* <!--footer--> */}
                      <div className="mt-2  space-x-4 p-3 text-center md:block">
                        <button
                          type="button"
                          onClick={() => {
                            Accdelshowsetter()
                          }}
                          className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
                        >
                          Delete
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
