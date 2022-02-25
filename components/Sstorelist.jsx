import Authaxios from '../components/Authaxios'
import useSWR from 'swr'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Storesloder from './loadingstores'
import Deltstore from './delstore'
import Updtstore from './updstore'
import Appointments from './strappoitment'
import { Tooltip } from '@mui/material'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

export default function Sellerstores({ search, Theme, Storecountesetter }) {
  const [Delstore, setDelstore] = useState(false)
  const [UpdStore, setUpdStore] = useState(false)
  const [Appointment, setAppointment] = useState(false)
  const [ModalStorename, setModalStorename] = useState('')
  const [location, setlocation] = useState()
  const [description, setdescription] = useState()
  const [Store_id, setStore_id] = useState('')
  const [Menu, setMenu] = useState(false)
  const [UnqKey, setUnqKey] = useState(null)
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL
  const userstoresURL = '/stores/getuserStores'

  function Menuesetter() {
    setMenu(!Menu)
  }

  function UpdStoresetter() {
    setUpdStore(!UpdStore)
  }

  function Delstoresetter() {
    setDelstore(!Delstore)
  }

  function Appointmentsetter() {
    setAppointment(!Appointment)
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
  const { data, error, mutate } = useSWR(userstoresURL, fetchResource)
  const loading = !data && !error

  const Stores = []
  if (!loading) {
    data.data.forEach((element) => {
      return Stores.push(element)
    })
  }

  useEffect(() => {
    if (Stores.length) {
      setTimeout(() => {
        Storecountesetter(Stores.length)
      }, 2000)
    }
  })

  const StoreData =
    !loading && Stores.filter((info) => info.storename.includes(search))

  function Dateconverter(date) {
    const dt = new Date(date)
    return dt.toLocaleString()
  }

  mutate()
  return (
    <>
      {loading ? (
        <Storesloder Theme={Theme} />
      ) : (
        <>
          {Theme ? (
            <>
              {StoreData.length ? (
                <>
                  {/*  */}

                  {StoreData.map((data, key) => {
                    return (
                      <div
                        key={key}
                        className="mx-auto  mb-2 mt-6 block w-full  items-center justify-between transition-all duration-1000"
                      >
                        <motion.div
                          animate={{ y: 30 }}
                          transition={{ type: 'spring', stiffness: 600 }}
                        >
                          <div
                            key={key}
                            className="items-cnter relative z-0 m-1 mx-auto block h-auto w-full justify-between rounded-md bg-gray-800 p-4 shadow-lg shadow-gray-900 md:flex lg:flex xl:flex"
                          >
                            <div className=" h-64 w-full justify-center rounded-md bg-cover"
                            style={{
                                backgroundImage:`url("${BaseUrl + data.img}")`,
                                backgroundSize: "100% 100%"
                              }}
                              >
                            </div>

                            <div className=" z-0  w-full items-center justify-end  p-1">
                              <>
                                <div className="absolute right-0 top-0 m-2 flex w-auto flex-wrap items-end justify-end ">
                                  <button
                                    onMouseEnter={() => {
                                      setUnqKey(key), Menuesetter()
                                    }}
                                    onClick={() => {
                                      Menuesetter()
                                    }}
                                    type="button"
                                    className="block items-center justify-center hover:animate-spin"
                                  >
                                    <Icon
                                      icon="flat-color-icons:settings"
                                      className="block  h-8 w-8"
                                    />
                                  </button>
                                  {UnqKey === key && Menu && (
                                    <div
                                      onMouseLeave={() => Menuesetter()}
                                      className="h-auto w-full items-center justify-center rounded-md bg-gray-700 shadow-md shadow-slate-400"
                                    >
                                      <div className="cursor-context-menu transition-all duration-700 hover:ml-3 hover:bg-slate-300 hover:bg-opacity-20">
                                        <a
                                          onClick={() => {
                                            Appointmentsetter(),
                                              setModalStorename(data.storename)
                                          }}
                                          className="flex items-center justify-between px-1  py-3 no-underline"
                                        >
                                          <p>Appointments</p>
                                        </a>
                                      </div>
                                      <hr className="m-1" />
                                      <div
                                        onClick={() => {
                                          UpdStoresetter(),
                                            setStore_id(data.id),
                                            setModalStorename(data.storename),
                                            setlocation(data.location),
                                            setdescription(data.description)
                                        }}
                                        className="cursor-context-menu transition-all duration-700 hover:ml-3 hover:bg-slate-300 hover:bg-opacity-20"
                                      >
                                        <a className="px-1 py-3 no-underline  ">
                                          Update
                                        </a>
                                      </div>
                                      <hr className="m-1" />
                                      <div
                                        onClick={() => {
                                          Delstoresetter(),
                                            setModalStorename(data.storename),
                                            setStore_id(data.id)
                                        }}
                                        className="cursor-context-menu transition-all duration-700 hover:ml-3 hover:bg-slate-300 hover:bg-opacity-20"
                                      >
                                        <a className="px-1 py-3 no-underline  ">
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>

                              <div className="sm:text-md block items-center  justify-between  p-1 text-sm  font-semibold  transition-all duration-1000 sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                                <p className="text-slate-400 transition-all duration-1000 ">
                                  {data.storename}
                                </p>
                              </div>
                              <p className="md:text-md xl:text-md p-1 font-sans text-sm transition-all duration-1000 sm:text-xs lg:text-sm ">
                                Created At {Dateconverter(data.created_at)}
                              </p>
                              <div className="flex items-center justify-start p-1 transition-all  duration-1000">
                                <p className="md:text-md xl:text-md mr-1 text-sm font-semibold text-slate-400 transition-all duration-1000 sm:text-sm lg:text-sm xl:text-lg">
                                  Store Type:{'  '}
                                </p>
                              </div>
                              <p className="ml-1 items-center justify-center text-sm transition-all duration-1000">
                                {data.store_type}
                              </p>
                              <div className="flex h-auto items-start justify-start p-1 transition-all  duration-1000">
                                <p className="md:text-md xl:text-md text-sm font-semibold text-slate-400 sm:text-sm lg:text-sm xl:text-lg">
                                  Location:{'  '}
                                </p>
                              </div>
                              <p className="overflow-clip p-0.5 text-sm transition-all duration-1000 ">
                                {data.location}
                              </p>
                              {/* description */}
                              <Tooltip title="Click to show description">
                                <div className="mt-2 flex h-fit items-start justify-start  p-0.5 transition-all  duration-1000">
                                  <details className=" flex w-full  rounded-lg  transition-all duration-1000  open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-800 dark:open:ring-white/10">
                                    <summary className="md:text-md xl:text-md select-none  text-sm  font-semibold leading-6 text-slate-400   sm:text-sm lg:text-sm xl:text-lg">
                                      Description:
                                    </summary>
                                    <div className="mt-2 p-3 text-justify text-sm leading-6  text-slate-300">
                                      <p>{data.description}</p>
                                    </div>
                                  </details>
                                </div>
                              </Tooltip>
                              {/* description */}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                  {/*  */}
                </>
              ) : (
                <>
                  <div className="col-start-1 col-end-13 mx-auto mb-2 mt-6 flex w-10/12 items-center justify-center bg-cover ">
                    <Image
                      src="/no_results.png"
                      alt="No data"
                      width={'100%'}
                      height={'100%'}
                    />
                    <p>No Data Found ❕ {search} ❕</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {StoreData.length ? (
                <>
                  {/*  */}
                  {StoreData.map((data, key) => {
                    return (
                      <div
                        key={key}
                        className="mx-auto mb-2  mt-6 block w-full  items-center justify-between transition-all duration-1000"
                      >
                        <motion.div
                          animate={{ y: 30 }}
                          transition={{ type: 'spring', stiffness: 600 }}
                        >
                          <div
                            key={key}
                            className="items-cnter relative z-0 m-1 mx-auto block h-auto w-full justify-between rounded-md bg-gray-400 p-4 shadow-lg shadow-gray-600 md:flex lg:flex xl:flex"
                          >
                            <div
                              className=" z-10 h-64 w-full justify-center rounded-md bg-cover "
                              style={{
                                backgroundImage:`url("${BaseUrl + data.img}")`,
                                backgroundSize: "100% 100%"
                              }}
                            >
                            </div>
                            <div className=" z-0  w-full items-center justify-end  p-1">
                              <>
                                <div className="absolute right-0 top-0 m-2 flex w-auto flex-wrap items-end justify-end ">
                                  <button
                                    onMouseEnter={() => {
                                      setUnqKey(key), Menuesetter()
                                    }}
                                    onClick={() => {
                                      Menuesetter()
                                    }}
                                    type="button"
                                    className="block items-center justify-center text-gray-100 hover:animate-spin"
                                  >
                                    <Icon
                                      icon="flat-color-icons:settings"
                                      className="block  h-8  w-8 text-gray-100"
                                    />
                                  </button>
                                  {UnqKey === key && Menu && (
                                    <div
                                      onMouseLeave={() => Menuesetter()}
                                      className="h-auto w-full items-center justify-center rounded-md bg-gray-500 shadow-md shadow-slate-700"
                                    >
                                      <div className="cursor-context-menu rounded-md transition-all duration-700 hover:ml-3 hover:bg-slate-900 hover:bg-opacity-20">
                                        <a
                                          onClick={() => {
                                            Appointmentsetter(),
                                              setModalStorename(data.storename)
                                          }}
                                          className="flex items-center justify-between px-1  py-3 no-underline"
                                        >
                                          <p>Appointments</p>
                                        </a>
                                      </div>
                                      <hr className="m-1" />
                                      <div
                                        onClick={() => {
                                          UpdStoresetter(),
                                            setStore_id(data.id),
                                            setModalStorename(data.storename),
                                            setlocation(data.location),
                                            setdescription(data.description)
                                        }}
                                        className="cursor-context-menu rounded-md transition-all duration-700 hover:ml-3 hover:bg-slate-900 hover:bg-opacity-20"
                                      >
                                        <a className="px-1 py-3 no-underline  ">
                                          Update
                                        </a>
                                      </div>
                                      <hr className="m-1" />
                                      <div
                                        onClick={() => {
                                          Delstoresetter(),
                                            setModalStorename(data.storename),
                                            setStore_id(data.id)
                                        }}
                                        className="cursor-context-menu rounded-md transition-all duration-700 hover:ml-3 hover:bg-slate-900 hover:bg-opacity-20"
                                      >
                                        <a className="px-1 py-3 no-underline  ">
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>

                              <div className="sm:text-md block items-center  justify-between  p-1 text-sm  font-semibold  transition-all duration-1000 sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                                <p className="text-slate-900 ">
                                  {data.storename}
                                </p>
                              </div>
                              <p className="md:text-md xl:text-md p-1 font-sans text-sm  transition-all duration-1000  sm:text-sm lg:text-sm ">
                                Created At {Dateconverter(data.created_at)}
                              </p>
                              <div className="flex items-center justify-start p-1 transition-all  duration-1000">
                                <p className="md:text-md xl:text-md mr-1 text-sm font-semibold text-slate-900 sm:text-sm lg:text-sm xl:text-lg">
                                  Store Type:{'  '}
                                </p>
                              </div>
                              <p className="ml-1 items-center justify-center text-sm transition-all duration-1000">
                                {data.store_type}
                              </p>
                              <div className="flex h-auto items-start justify-start p-1 transition-all  duration-1000">
                                <p className="md:text-md xl:text-md text-sm font-semibold text-slate-900 sm:text-sm lg:text-sm xl:text-lg">
                                  Location:{'  '}
                                </p>
                              </div>
                              <p className="overflow-clip p-0.5 text-sm transition-all duration-1000 ">
                                {data.location}
                              </p>
                              {/* description */}
                              <Tooltip title="Click to show description">
                                <div className="mt-2 flex h-fit items-start justify-start  p-0.5 transition-all  duration-1000">
                                  <details className=" flex w-full  rounded-lg  transition-all duration-1000  open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-gray-500 dark:open:ring-white/10">
                                    <summary className="md:text-md xl:text-md select-none  text-sm  font-semibold leading-6 text-slate-900   sm:text-sm lg:text-sm xl:text-lg">
                                      Description:
                                    </summary>
                                    <div className="mt-2 p-3 text-justify text-sm leading-6 text-slate-300 ">
                                      <p>{data.description}</p>
                                    </div>
                                  </details>
                                </div>
                              </Tooltip>
                              {/* description */}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                  {/*  */}
                </>
              ) : (
                <>
                  <div className="col-start-1 col-end-13 mx-auto mb-2 mt-6 flex w-10/12 items-center justify-center bg-cover ">
                    <Image
                      src="/no_results.png"
                      alt="No data"
                      width={'100%'}
                      height={'100%'}
                    />
                    <p>No Data Found ❕ {search} ❕</p>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      {/* delete store */}
      {Delstore && (
        <Deltstore
          Delstoresetter={Delstoresetter}
          storename={ModalStorename}
          store_id={Store_id}
        />
      )}
      {/* delete store */}
      {/* update store */}
      {UpdStore && (
        <Updtstore
          UpdStoresetter={UpdStoresetter}
          store_id={Store_id}
          storename={ModalStorename}
          location={location}
          description={description}
        />
      )}
      {/* update store */}
      {/* Appointments menu */}
      {Appointment && (
        <Appointments
          Appointmentsetter={Appointmentsetter}
          storename={ModalStorename}
        />
      )}
      {/* Appointments menu */}
    </>
  )
}
