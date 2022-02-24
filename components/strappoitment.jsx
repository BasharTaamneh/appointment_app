import { useState } from 'react'
import Authaxios from '../components/Authaxios'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import useSWR, { mutate } from 'swr'
import Sucssmsg from './sucssmsg'
import { Tooltip, ClickAwayListener } from '@mui/material'

export default function Appointments({ storename, Appointmentsetter }) {
  const [Appointment_id, setAppointment_id] = useState(null)
  const [Appointment_status, setAppointment_status] = useState(null)
  const [Success, setSuccess] = useState(false)
  const [Helper, setHelper] = useState(false)
  const storeappointmentsURL = '/appointments/getstoreAppointments?storename='
  const updateappointmentURL = '/appointments/updateAppointment'
  const cancceldcounter = 0
  const handleClick = () => {
    setHelper((prev) => !prev)
  }


  const handleClickAway = () => {
    setHelper(false)
  }

  function SuccessHandler() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 4000)
  }

  async function AppointmentUpdate() {
    if (Appointment_status && Appointment_id) {
      const formdata = {}
      formdata['appointment_id'] = await Appointment_id
      formdata['status'] = await Appointment_status

      await Authaxios()
        .put(updateappointmentURL, formdata)
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
    mutate()
  }

  if (storename) {
    const fetchResource = async (url) => {
      try {
        const response = await Authaxios().get(url)
        return response.data
      } catch (error) {
        if (
          error.response.data.message.includes('jwt') ||
          error.response.data.message.includes('Token')
        ) {
          localStorage.removeItem('auth')
          router.reload()
        }
      }
    }
    const { data, error, mutate } = useSWR(
      storeappointmentsURL + storename,
      fetchResource
    )
    const loading = !data && !error

    const StoreAppointments = []
    if (!loading) {
      data.data.forEach((element) => {
        return StoreAppointments.push(element)
      })
    }
    mutate()
  }
  
  return (
    <>
      <div>
        <div
          className="z-1000 fixed left-4 top-5 flex min-h-screen  w-full items-center justify-center bg-gray-400 bg-opacity-10 text-black shadow-md backdrop-blur-md backdrop-filter sm:top-5 md:top-16 lg:top-16 xl:top-16 
        "
        >
          <div className=" max-h-6xl m-1 mx-auto  block   w-3/4 max-w-6xl items-center justify-center rounded-md bg-gray-100 p-2">
            {/*       */}
            {/* control */}
            <div className="m-2 flex items-center justify-end">
              {/* helper */}
              <ClickAwayListener onClickAway={handleClickAway}>
                <Tooltip title="How to control appointments?">
                  <button
                    onClick={handleClick}
                    className="mx-2 mt-0.5 w-fit rounded-full shadow-md shadow-slate-700 transition-all duration-100 hover:shadow-sm"
                  >
                    <Icon icon="icon-park:help" className="block h-8 w-8" />
                  </button>
                </Tooltip>
              </ClickAwayListener>
              {Helper && (
                <div className="md:top-38 lg:top-38 xl:top-38 fixed right-24 top-36 z-10 h-72 w-9/12 snap-y items-center justify-center overflow-auto rounded-md bg-slate-700 bg-opacity-90 p-8 shadow-xl shadow-slate-900 transition-all  duration-1000 sm:right-40 md:right-44 md:w-5/12 lg:right-52 xl:right-56 ">
                  <ul className="list-outside list-disc text-gray-200">
                    <h2 className="text-md mb-2 text-2xl font-bold">Options</h2>
                    <li className="text-md font-semibold">ِِAccept</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        It enables you to accept the appointment on time, as you
                        can cancel the appointment after that if you change your
                        mind, but this will remove it from your list.
                      </li>
                    </ul>
                    <li className="text-md font-semibold">Reject</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        It enables you to reject the appointment as you can
                        accept it afterward if you change your mind and at the
                        same time authorizes the buyer to remove it from your
                        list if he decides to do so.
                      </li>
                    </ul>
                    <li className="text-md font-semibold">Cancel</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        It enables you to cancel the appointment if it is
                        accepted, but this will remove it from your list.
                      </li>
                    </ul>
                  </ul>
                </div>
              )}
              {/* helper */}
              {/*        */}
              {/* close */}
              <Tooltip title="close" arrow>
                <button
                  onClick={() => Appointmentsetter()}
                  className="rounded-md bg-red-500 shadow-md shadow-slate-700 transition-all duration-100 hover:bg-red-600 hover:shadow-sm"
                >
                  <Icon icon="line-md:close" className="block h-8 w-8" />
                </button>
              </Tooltip>
              {/* close */}
            </div>
            {/* control */}
            {/*       */}
            {/* Succusse */}
            {Success && Sucssmsg('Action successfully done 😎')}
            {/* Succusse */}
            {loading ? (
              <>
                {/* loading Appointment */}
                <div className="flex h-auto w-full items-center justify-center rounded-sm bg-cover">
                  <Image
                    className="w-full rounded-full"
                    src="/cuteloading.gif"
                    width={'450%'}
                    height={'450%'}
                  />
                </div>
                {/* loading Appointment */}
              </>
            ) : (
              <>
                {StoreAppointments.length ? (
                  <>
                    {/* Appointments Data */}
                    <div className="h-96 w-auto snap-y overflow-y-scroll p-2 ">
                      {StoreAppointments.map((appoint, key) => {
                        if (appoint.status == 'pending') {
                          return (
                            <>
                              {/* pending taple */}
                              <div
                                key={key}
                                className="my-8 table w-full overflow-x-scroll rounded-md bg-blue-200 shadow-lg shadow-slate-600 ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100"
                              >
                                <div key={key} className=" table-header-group">
                                  <div className="table-row">
                                    <div className="table-cell px-2 text-left font-bold">
                                      User
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      will Come In
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.user}
                                    </div>
                                    <div className="table-cell px-2 font-semibold text-blue-600">
                                      {appoint.status.toUpperCase()}
                                    </div>
                                    <div className="table-cell px-2">
                                      <input
                                        readOnly
                                        className="rounded-full bg-blue-200 ring-1 ring-blue-500"
                                        type="datetime-local"
                                        value={appoint.date.slice(0, 16)}
                                      />
                                    </div>
                                    <div className="table-cell px-2">
                                      <button
                                        onClick={() => {
                                          setAppointment_status(null),
                                            setAppointment_id(appoint.id),
                                            setAppointment_status('accepted'),
                                            AppointmentUpdate()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-green-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-green-600 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        onClick={() => {
                                          setAppointment_status(null),
                                            setAppointment_id(appoint.id),
                                            setAppointment_status('rejected'),
                                            AppointmentUpdate()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-red-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-red-600 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* pending taple */}
                            </>
                          )
                        }
                        if (appoint.status == 'accepted') {
                          return (
                            <>
                              {/* Accepted taple */}
                              <div
                                key={key}
                                className="my-8 table w-full overflow-x-scroll rounded-md bg-green-200 shadow-lg shadow-slate-600 ring-2 ring-green-500 ring-offset-4 ring-offset-green-100"
                              >
                                <div key={key} className=" table-header-group">
                                  <div className="table-row">
                                    <div className="table-cell px-2 text-left font-bold">
                                      User
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Coming On
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.user}
                                    </div>
                                    <div className="table-cell px-2 font-semibold text-green-600">
                                      {appoint.status.toUpperCase()}
                                    </div>
                                    <div className="table-cell px-2">
                                      <input
                                        readOnly
                                        className="rounded-full bg-green-200 ring-1 ring-green-500"
                                        type="datetime-local"
                                        value={appoint.date.slice(0, 16)}
                                      />
                                    </div>
                                    <div className="table-cell px-2">
                                      <button
                                        onClick={() => {
                                          setAppointment_status(null),
                                            setAppointment_id(appoint.id),
                                            setAppointment_status('canceled'),
                                            AppointmentUpdate()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-gray-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-gray-600 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Accepted taple */}
                            </>
                          )
                        }
                        if (appoint.status == 'rejected') {
                          return (
                            <>
                              {/* Rejected taple */}
                              <div
                                key={key}
                                className="my-8 table w-full overflow-x-scroll rounded-md bg-red-200 shadow-lg shadow-slate-600 ring-2 ring-red-500 ring-offset-4 ring-offset-red-100"
                              >
                                <div key={key} className=" table-header-group">
                                  <div className="table-row">
                                    <div className="table-cell px-2 text-left font-bold">
                                      User
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Was Coming In
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.user}
                                    </div>
                                    <div className="table-cell px-2 font-semibold text-red-600">
                                      {appoint.status.toUpperCase()}
                                    </div>
                                    <div className="table-cell px-2">
                                      <input
                                        readOnly
                                        className="rounded-full bg-red-200 ring-red-500"
                                        type="datetime-local"
                                        value={appoint.date.slice(0, 16)}
                                      />
                                    </div>
                                    <div className="table-cell px-2">
                                      <button
                                        onClick={() => {
                                          setAppointment_status(null),
                                            setAppointment_id(appoint.id),
                                            setAppointment_status('accepted'),
                                            AppointmentUpdate()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-green-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-green-600 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Accept
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Rejected taple */}
                            </>
                          )
                        }
                        if (appoint.status == 'canceled') {
                          cancceldcounter += 1
                          if (StoreAppointments.length == cancceldcounter){
                            return (
                              <>
                                {/* No Appointments Data */}
                                <div className="h-auto w-full items-center justify-center rounded-lg bg-cover">
                                  <div className=" flex w-full animate-pulse items-center justify-center font-bold text-black">
                                    <p>Your appointments are canceled</p>
                                  </div>
                                  <div className="flex w-full items-center justify-center rounded-full">
                                    <Image
                                      className="rounded-full"
                                      src="/emptyshot.gif"
                                      width={'150%'}
                                      height={'150%'}
                                    />
                                  </div>
                                </div>
                                {/* No Appointments Data */}
                              </>
                            )
                          }
                        }
                      })}
                    </div>
                    {/* Appointments Data */}
                  </>
                ) : (
                  <>
                    {/* No Appointments Data */}
                    <div className="h-auto w-full items-center justify-center rounded-lg bg-cover">
                      <div className=" flex w-full animate-pulse items-center justify-center font-bold text-black">
                        <p>No Appointments Yet</p>
                      </div>
                      <div className="flex w-full items-center justify-center rounded-full">
                        <Image
                          className="rounded-full"
                          src="/shot.gif"
                          width={'150%'}
                          height={'150%'}
                        />
                      </div>
                    </div>
                    {/* No Appointments Data */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
