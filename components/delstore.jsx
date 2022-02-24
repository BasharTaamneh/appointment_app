import { useState } from 'react'
import Authaxios from '../components/Authaxios'
import Sucssmsg from './sucssmsg'
import { mutate } from 'swr'

export default function Deltstore({ Delstoresetter, storename, store_id }) {
  const storedeleteURL = '/stores/deleteStore'
  const [Success, setSuccess] = useState(false)
  function Succdelstr() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 20000)
    setTimeout(() => Delstoresetter(), 2000)
  }

  
  async function delstrhandler() {
    await Authaxios()
      .delete(storedeleteURL, {
        data: { store_id: store_id },
      })
      .then((response) => {
        response && Succdelstr()
      })
      .catch((err) => {
        ;(err && err.response.data.message.includes('jwt')) ||
        err.response.data.message.includes('Token')
          ? (localStorage.removeItem('auth'), Router.reload())
          : ''
      })
  }
  mutate()
  return (
    <>
      <div>
        <div
          className="z-1000 fixed left-4 top-10 flex  min-h-screen w-full items-center justify-center bg-red-300 bg-opacity-10 shadow-sm backdrop-blur-md backdrop-filter sm:top-10 md:top-20 lg:top-20 xl:top-20 
        "
        >
          {Success ? (
            Sucssmsg(storename + ' store has been successfully Deleted ❌')
          ) : (
            <div className="z-1000 relative -top-10 mx-12 my-auto h-auto max-w-md rounded-xl bg-white shadow-sm ">
              {/* <!--content--> */}
              {/* <!--body--> */}
              <div className="flex-auto justify-center p-3 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-m-1 mx-auto flex h-8 w-8 items-center text-red-500"
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
                  className="mx-auto flex h-24 w-24 items-center text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="py-1 text-xl font-bold ">Are you sure?</h3>
                <p className="text-md px-2 text-gray-800">
                  Do you really want to delete
                  <a className="font-bold underline decoration-indigo-500 underline-offset-2">
                    {' '}
                    {storename}{' '}
                  </a>
                  store?{' '}
                </p>
                <p className="text-md px-2 text-gray-800">
                  This process cannot be undone{' '}
                </p>
              </div>
              {/* <!--footer--> */}
              <div className="mt-2  space-x-4 p-3 text-center md:block">
                <button
                  type="button"
                  onClick={() => {
                    Delstoresetter()
                  }}
                  className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                >
                  Cancel
                </button>
                <button
                  onClick={() => delstrhandler()}
                  className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
