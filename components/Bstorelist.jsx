import Authaxios from '../components/Authaxios'
import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import Storesloder from './loadingstores'
import { Icon } from '@iconify/react'
import { Tooltip } from '@mui/material'
import Createappointment from './createAppoitment'
import { motion } from 'framer-motion'

export default function Buyerstores({ search, Theme, username }) {
  const [Appointment, setAppointment] = useState(false)

  const [ModalStorename, setModalStorename] = useState('')
  const BaseUrl = process.env.NEXT_PUBLIC_API_URL
  const storesearchURL = 'stores/searchStoreslist'

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
  const { data, error, mutate } = useSWR(storesearchURL, fetchResource)
  const loading = !data && !error

  const Stores = []
  if (!loading) {
    data.data.forEach((element) => {
      return Stores.push(element)
    })
  }

  const StoreData =
    !loading && Stores.filter((info) => info.storename.includes(search))

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
                            <div className=" flex h-64  w-full justify-center rounded-md bg-gray-800 bg-cover">
                              <Image
                                className=" z-0  mx-auto w-full rounded-md"
                                src={BaseUrl + data.img}
                                alt="Store backgroundImage"
                                width={'300%'}
                                height={'300%'}
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                              />
                            </div>
                            <div className=" z-0  w-full items-center justify-end  p-1">
                              <div className="sm:text-md block items-center  justify-between  p-1 text-sm  font-semibold  transition-all duration-1000 sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                                <p className="text-slate-400 transition-all duration-1000 ">
                                  {data.storename}
                                </p>
                              </div>
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
                                    <summary className="md:text-md xl:text-md select-none  text-sm  font-semibold leading-6 text-slate-400  sm:text-sm lg:text-sm xl:text-lg">
                                      Description:
                                    </summary>
                                    <div className="mt-2  mb-8 p-3 text-justify text-sm leading-6  text-slate-300">
                                      <p>{data.description}</p>
                                    </div>
                                  </details>
                                </div>
                              </Tooltip>
                              {/* description */}
                            </div>
                            <>
                              <div className="absolute -bottom-6 right-6 mt-12 flex w-auto flex-wrap items-end  justify-end rounded-full sm:right-48 md:bottom-1 md:right-12 ">
                                <button
                                  onClick={() => {
                                    Appointmentsetter(),
                                      setModalStorename(data.storename)
                                  }}
                                  type="button"
                                  className="flex items-center justify-center rounded-full bg-slate-700 p-2 shadow-md shadow-slate-900 transition-all duration-300  hover:bg-slate-900 hover:shadow-slate-500"
                                >
                                  <p className="mr-1">Book An Appointment </p>
                                  <Icon
                                    icon="cil:note-add"
                                    className="h-4 w-4"
                                  />
                                </button>
                              </div>
                            </>
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
                            <div className="flex h-64 w-full  justify-center rounded-md bg-gray-400 bg-cover ">
                              <Image
                                className=" z-0  mx-auto w-full rounded-md"
                                src={BaseUrl + data.img}
                                alt="Store backgroundImage"
                                width={'300%'}
                                height={'300%'}
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                              />
                            </div>
                            <div className=" z-0  w-full items-center justify-end  p-1">
                              <div className="sm:text-md block items-center  justify-between  p-1 text-sm  font-semibold  transition-all duration-1000 sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                                <p className="text-slate-900 ">
                                  {data.storename}
                                </p>
                              </div>
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
                                {/* description */}
                              </Tooltip>
                            </div>
                            <>
                              <div className="absolute -bottom-6 right-6 mt-12 flex w-auto flex-wrap items-end  justify-end rounded-full sm:right-48 md:bottom-1 md:right-12 ">
                                <button
                                  onClick={() => {
                                    Appointmentsetter(),
                                      setModalStorename(data.storename)
                                  }}
                                  type="button"
                                  className="flex items-center justify-center rounded-full bg-slate-500 p-2 shadow-md shadow-slate-700 transition-all duration-300  hover:bg-slate-700 hover:shadow-slate-300"
                                >
                                  <p className="mr-1">Book An Appointment </p>
                                  <Icon
                                    icon="cil:note-add"
                                    className="h-4 w-4"
                                  />
                                </button>
                              </div>
                            </>
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

      {/* Appointments creation */}
      {Appointment && (
        <Createappointment
          Appointmentsetter={Appointmentsetter}
          storename={ModalStorename}
          username={username}
        />
      )}
      {/* Appointments creation */}
    </>
  )
}
