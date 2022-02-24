import { useState } from 'react'
import Authaxios from '../components/Authaxios'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import useSWR from 'swr'
import Sucssmsg from './sucssmsg'
import Edieappointment from './Appointedite'
import { Tooltip, ClickAwayListener } from '@mui/material'

export default function Userappointments({ Appointmentshowsetter }) {
  const [Appointment_id, setAppointment_id] = useState(null)
  const [Appointment_status, setAppointment_status] = useState(null)
  const [Success, setSuccess] = useState(false)
  const [Editappoint, setEditappoint] = useState(false)
  const [Appointment_date, setAppointment_date] = useState(null)
  const [Storename, setStorename] = useState(null)
  const [Helper, setHelper] = useState(false)

  const userappointmentsURL = '/appointments/getuserAppointments'
  const updateappointmentURL = '/appointments/updateAppointment'
  const deleteappointmentURL = '/appointments/deleteAppointment'

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

  function Editappointsetter() {
    setEditappoint(!Editappoint)
  }

  async function AppointmentUpdate() {
    if (Appointment_status && Appointment_id) {
      const formdata = {}
      formdata['status'] = Appointment_status
      formdata['appointment_id'] = Appointment_id

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

  async function Appointmentdelete() {
    if (Appointment_id) {
      await Authaxios()
        .delete(deleteappointmentURL, {
          data: {
            appointment_id: Appointment_id,
          },
        })
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
  const { data, error, mutate } = useSWR(userappointmentsURL, fetchResource)
  const loading = !data && !error

  const Appointments = []
  if (!loading) {
    data.data.forEach((element) => {
      return Appointments.push(element)
    })
  }

  mutate()
  return (
    <>
      <div>
        <div
          className="z-1000 fixed left-4 top-5 flex min-h-screen  w-full items-center justify-center bg-gray-400 bg-opacity-10 text-black shadow-md backdrop-blur-md backdrop-filter sm:top-5 md:top-16 lg:top-16 xl:top-16 
        "
        >
          <div className=" max-h-6xl m-1 mx-auto  block   w-3/4 max-w-6xl items-center justify-center rounded-md bg-gray-100 p-2">
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
                <div className="fixed right-24 top-36 z-10 sm:right-40 md:right-44 md:top-38 lg:right-52 lg:top-38 xl:top-38 xl:right-56 h-72 w-9/12 snap-y items-center justify-center overflow-auto rounded-md bg-slate-700 bg-opacity-90  p-8 shadow-xl shadow-slate-900 transition-all duration-1000 md:w-5/12 ">
                  <ul className="list-outside list-disc text-gray-200">
                    <h2 className="text-md mb-2 text-2xl font-bold">Options</h2>
                    <li className="text-md font-semibold">Edit</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        You can modify the appointment long as the seller has
                        not accepted it yet.
                      </li>
                    </ul>
                    <li className="text-md font-semibold">Cancel</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        You can cancel the appointment, whether it is accepted
                        or not.
                      </li>
                    </ul>
                    <li className="text-md font-semibold">Delete</li>
                    <ul className="mb-0.5 list-none">
                      <li>
                        You can delete the appointment from your list in the
                        event that it was canceled or rejected by the seller or
                        canceled by you.
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
                  onClick={() => Appointmentshowsetter()}
                  className="rounded-md bg-red-500 shadow-md shadow-slate-700 transition-all duration-100 hover:bg-red-600 hover:shadow-sm"
                >
                  <Icon icon="line-md:close" className="block h-8 w-8" />
                </button>
              </Tooltip>
              {/* close */}
            </div>
            {/* control */}
            {/*        */}
            {/* Succusse */}
            {Success && Sucssmsg('Action successfully done 😎')}
            {/* Succusse */}
            {/*        */}
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
                {Appointments.length ? (
                  <>
                    {/* Appointments Data */}
                    <div className="h-96 w-auto snap-y overflow-y-scroll p-2 ">
                      {Appointments.map((appoint, key) => {
                        if (appoint.status == 'pending') {
                          return (
                            <>
                              {/*pending taple */}
                              <div
                                key={key}
                                className="my-8 table w-full overflow-x-scroll rounded-md
                              bg-blue-200 shadow-lg shadow-slate-600 ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100"
                              >
                                <div key={key} className=" table-header-group">
                                  <div className="table-row">
                                    <div className="table-cell px-2 text-left font-bold">
                                      Store
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      booked at
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.storename}
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
                                          setAppointment_id(appoint.id),
                                            setAppointment_date(appoint.date),
                                            setStorename(appoint.storename),
                                            Editappointsetter()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-green-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-green-600 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => {
                                          setAppointment_id(appoint.id),
                                            setAppointment_status(null),
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
                                      Store
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      booked At
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.storename}
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
                                          setAppointment_id(appoint.id),
                                            setAppointment_status(null),
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
                                      Store
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      booked At
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.storename}
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
                                          setAppointment_id(appoint.id),
                                            Appointmentdelete()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-rose-600 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-rose-800 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Delete
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
                          return (
                            <>
                              {/* Canceled taple */}
                              <div
                                key={key}
                                className="my-8 table w-full overflow-x-scroll rounded-md bg-gray-200 shadow-lg shadow-slate-600 ring-2 ring-slate-500 ring-offset-4 ring-offset-slate-100"
                              >
                                <div key={key} className=" table-header-group">
                                  <div className="table-row">
                                    <div className="table-cell px-2 text-left font-bold">
                                      Store
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Appointment Status
                                    </div>
                                    <div className="table-cell px-2 text-left font-bold">
                                      Actions
                                    </div>
                                  </div>
                                </div>
                                <div className="table-row-group">
                                  <div className="my-1 table-row h-full p-1">
                                    <div className="table-cell px-2 font-semibold">
                                      {appoint.storename}
                                    </div>
                                    <div className="table-cell px-2 font-semibold text-gray-600">
                                      {appoint.status.toUpperCase()}
                                    </div>
                                    <div className="table-cell px-2">
                                      <button
                                        onClick={() => {
                                          setAppointment_id(appoint.id),
                                            Appointmentdelete()
                                        }}
                                        className="mx-2 my-2 w-20 rounded-full bg-rose-600 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-rose-800 hover:shadow-sm hover:shadow-slate-500"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Canceled taple */}
                            </>
                          )
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
      {Editappoint && (
        <Edieappointment
          storename={Storename}
          appointment_date={Appointment_date}
          appointment_id={Appointment_id}
          Editappointsetter={Editappointsetter}
        />
      )}
    </>
  )
}
