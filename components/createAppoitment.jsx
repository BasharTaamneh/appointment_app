import Sucssmsg from './sucssmsg'
import { useState } from 'react'
import Warnmsg from './warnmsg'
import Authaxios from '../components/Authaxios'
import { mutate } from 'swr'

export default function Createappointment({
  username,
  storename,
  Appointmentsetter,
}) {
  const [Success, setSuccess] = useState(false)
  const [Datetime, setDatetime] = useState(null)
  const [Nodate, setNodate] = useState(false)
  const minDate = new Date(Date.now()).toISOString().slice(0, 16)
  const createappointmentURL = '/appointments/createAppointment'

  function SuccessHandler() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
    setTimeout(() => Appointmentsetter(), 2000)
  }

  async function handler(e) {
    e.preventDefault()
    if (!Datetime) {
      setNodate(true)
    }
    if (Datetime) {
      const formdata = {}
      formdata['date'] = Datetime
      formdata['storename'] = storename

      await Authaxios()
        .post(createappointmentURL, formdata)
        .then((response) => {
          response && SuccessHandler()
        })
        .catch((err) => {
          ;(err && err.response.data.message.includes('jwt')) ||
          err.response.data.message.includes('Token')
            ? (localStorage.removeItem('auth'), Router.reload())
            : ''
        })
    }
  }
  mutate()
  return (
    <>
      <div className="transition-all duration-700">
        <div
          className="z-1000 fixed left-4 top-1 flex min-h-screen w-full  items-center justify-center bg-gray-400 bg-opacity-10 shadow-sm backdrop-blur-md backdrop-filter transition-all duration-700 sm:top-5 md:top-16 lg:top-16 xl:top-16 
        "
        >
          {Success ? (
            Sucssmsg(
              ' An appointment has been successfully created for ' +
                storename +
                'store 😎'
            )
          ) : (
            <div className="relative -top-16 m-1 mx-auto block h-auto w-3/4  max-w-2xl  items-center justify-center rounded-md bg-gray-100 p-2 transition-all duration-700">
              <blockquote className="m-1 items-center justify-center p-1 text-center text-lg font-semibold italic text-slate-900">
                <span className="relative m-2 inline-block  p-1 shadow-md before:absolute before:-inset-1 before:block before:-skew-y-3 before:rounded-md before:bg-green-500 before:shadow-lg">
                  <span className="relative rounded-md p-1 text-white">
                    {username}
                  </span>
                </span>
                <span>You are about to book an appointment to visit</span>
                <span className="relative m-2 inline-block p-1 shadow-md before:absolute before:-inset-1 before:block before:-skew-y-3 before:animate-pulse before:rounded-md before:bg-green-500 before:shadow-lg">
                  <span className="relative rounded-md p-1 text-white">
                    {storename}
                  </span>
                </span>
                store.
              </blockquote>
              <form
                className="transition-all duration-700"
                onSubmit={(e) => {
                  handler(e)
                }}
              >
                {/* body */}
                <div className="flex w-full items-center justify-center">
                  <input
                    defaultValue={minDate}
                    min={minDate}
                    onChange={(e) => {
                      setDatetime(e.target.value), setNodate(false)
                    }}
                    className="my-2 h-full w-2/4 rounded-lg bg-green-100 p-1 text-slate-800 shadow-xl shadow-zinc-600 transition-all duration-300 hover:shadow-md hover:shadow-zinc-600 focus:outline-green-300 "
                    type="datetime-local"
                    id="appointmentdate"
                    name="appointmentdate"
                  />
                </div>
                {Nodate && Warnmsg('Please select  (Date & Time) first 😅❕')}
                {/* body */}
                {/* <!--footer--> */}
                <div className="mt-2 space-x-4 p-3 text-center transition-all duration-300 md:block">
                  <button
                    type="button"
                    onClick={() => Appointmentsetter()}
                    className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="mb-2 rounded-full border border-green-500 bg-green-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-green-600 hover:shadow-lg md:mb-0"
                  >
                    Book
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
