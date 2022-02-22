import Authaxios from '../components/Authaxios'
import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import swal from 'sweetalert'
import Warnmsg from './warnmsg'
import Storesloder from './loadingstores'

export default function Buyerstrlist({ search, Theme }) {
  const [Delstore, setDelstore] = useState(false)
  const [UpdStore, setUpdStore] = useState(false)
  const [storename, setstorename] = useState()
  const [location, setlocation] = useState()
  const [description, setdescription] = useState()
  const [img, setimg] = useState()
  const [Store_id, setStore_id] = useState('')
  const [Existname, setExistname] = useState(false)
  const BaseUrl = process.env.API_URL
  const userstoresURL = '/stores/getuserStores'
  const storeupdateURL = '/stores/updateStore'
  const storedeleteURL = '/stores/deleteStore'

  function UpdStoresetter() {
    setUpdStore(!UpdStore)
  }

  function Delstoresetter() {
    setDelstore(!Delstore)
  }

  function Succdelstr(strname) {
    setTimeout(() => {
      swal(
        'success!',
        'successfully delete ' + `${strname}` + ' store',
        'success'
      )
    }, 500)
  }

  function Succupdstr(strname) {
    setTimeout(() => {
      swal(
        'success!',
        'successfully update ' + `${strname}` + ' store',
        'success'
      )
    }, 500)
  }

  async function updstrhandler(e) {
    e.preventDefault()
    const formData = new FormData()
    storename && formData.append('storename', storename)
    location && formData.append('location', location)
    description && formData.append('description', description)
    img && formData.append('img', img)
    formData.append('store_id', Store_id)
    await Authaxios()
      .put(storeupdateURL, formData)
      .then((response) => {
        response && response.status == 200
          ? (Succupdstr(storename), UpdStoresetter())
          : ''
      })
      .catch((err) => {
        ;(err && err.response.data.message.includes('jwt')) ||
        err.response.data.message.includes('Token')
          ? (localStorage.removeItem('auth'), Router.reload())
          : err.response.data.message.includes('storename')
          ? setExistname(true)
          : ''
      })
  }

  async function delstrhandler(strname) {
    await Authaxios()
      .delete(storedeleteURL, {
        data: { store_id: Store_id },
      })
      .then((response) => {
        response && response.status == 200
          ? (Succdelstr(strname), Delstoresetter())
          : ''
      })
      .catch((err) => {
        ;(err && err.response.data.message.includes('jwt')) ||
        err.response.data.message.includes('Token')
          ? (localStorage.removeItem('auth'), Router.reload())
          : ''
      })
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

  const StoreData =
    !loading && Stores.filter((info) => info.storename.includes(search))

  function Dateconverter(date) {
    const dt = new Date(date)
    return dt.toDateString()
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
                        className="col-start-2 col-end-12 mx-auto mb-2 mt-6 w-10/12 items-center justify-center"
                      >
                        {/* delete store */}
                        {Delstore && (
                          <div className="bottom-2 m-1 mx-auto block h-auto  w-full items-center justify-center rounded-md border-red-700 bg-gray-800 p-2">
                            <div className="flex-auto justify-center p-2 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="-m-1 mx-auto flex h-5 w-5 items-center text-red-500"
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
                              <h3 className="py-4 text-xl font-bold ">
                                Are you sure?
                              </h3>
                              <p className="px-8 text-sm text-gray-500">
                                Do you really want to delete `( {data.storename}{' '}
                                )` store? This process cannot be undone
                              </p>
                            </div>
                            <div className="mt-2  space-x-4 p-3 text-center md:block">
                              <button
                                type="button"
                                onClick={() => Delstoresetter()}
                                className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  delstrhandler(data.storename)
                                }}
                                className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                        {/* delete store */}
                        {/* update store */}
                        {UpdStore && (
                          <div className="bottom-2 m-1 mx-auto block h-auto  w-full items-center justify-center rounded-md border-red-700 bg-gray-800 p-2">
                            <form
                              onSubmit={(e) => {
                                updstrhandler(e)
                              }}
                            >
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <input
                                    className="flex"
                                    onChange={(e) => {
                                      setstorename(e.target.value),
                                        setExistname(false)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Storename"
                                    type="text"
                                    defaultValue={data.storename}
                                    name="storename"
                                  />
                                </div>
                              </div>
                              {Existname &&
                                Warnmsg(storename + ' already exists ❕ 😅')}
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <textarea
                                    className="flex"
                                    onChange={(e) => {
                                      setdescription(e.target.value)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3  font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Description"
                                    type="text"
                                    defaultValue={data.description}
                                    name="description"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <input
                                    className="flex"
                                    onChange={(e) => {
                                      setlocation(e.target.value)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Location"
                                    type="location"
                                    defaultValue={data.location}
                                    name="location"
                                  />
                                </div>
                              </div>
                              {/*  */}
                              <div className="mx-auto flex w-2/4  items-center justify-center py-3 px-1">
                                <div className="focus:shadow-outline items-center justify-center rounded-full font-semibold shadow-2xl shadow-slate-600">
                                  <div className=" mx-auto w-full cursor-pointer items-center justify-center rounded-full bg-green-500 py-1 text-white hover:animate-pulse hover:bg-green-700">
                                    <div className="mx-auto flex w-full items-center justify-center text-xl font-medium">
                                      <Icon
                                        className="mr-2 block h-10 w-10"
                                        icon="bx:image-add"
                                      />
                                    </div>
                                    <input
                                      onChange={(e) =>
                                        setimg(e.target.files[0])
                                      }
                                      accept=".png, .jpg, .jpeg"
                                      className="mx-auto flex w-full cursor-pointer items-center justify-center font-medium file:opacity-0"
                                      type="file"
                                      name="img"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/*  */}
                              {/* <!--footer--> */}
                              <div className="mt-2  space-x-4 p-3 text-center md:block">
                                <button
                                  type="button"
                                  onClick={() => UpdStoresetter()}
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
                        )}
                        {/* update store */}
                        <div className=" items-cnter m-1 mx-auto block h-auto w-full justify-between rounded-md bg-gray-800 p-4 shadow-lg shadow-gray-900 md:flex lg:flex xl:flex">
                          <div className="flex h-64 w-full  justify-center rounded-md bg-gray-800 bg-cover md:w-5/12 lg:w-5/12 xl:w-fit">
                            <Image
                              className="mx-auto w-full rounded-md"
                              src={BaseUrl + data.img}
                              alt="Store backgroundImage"
                              width={'300%'}
                              height={'300%'}
                              placeholder="blur"
                              blurDataURL="/placeholder.png"
                            />
                          </div>
                          <div className=" w-full items-center justify-end p-1">
                            <div className="sm:text-md  block  items-center justify-between  p-1  text-xs font-semibold sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                              <p className="text-slate-400 ">
                                {data.storename}
                              </p>

                              <div className="relative block h-auto items-end justify-center ">
                                <button
                                  type="button"
                                  onClick={() => {
                                    UpdStoresetter(), setStore_id(data.id)
                                  }}
                                  className="m-1 rounded-full bg-slate-500 p-2 text-sm font-semibold text-gray-100 shadow-md shadow-slate-500  transition-colors duration-200  hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-600 "
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    Delstoresetter(), setStore_id(data.id)
                                  }}
                                  className="m-1 rounded-full bg-slate-500 p-2 text-sm font-semibold text-gray-100 shadow-md shadow-slate-500 transition-colors   duration-200 hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-600 "
                                >
                                  Delete
                                </button>
                                <button className="relative m-1 overflow-visible rounded-full bg-slate-500 p-2 text-sm font-semibold text-gray-100 shadow-md   shadow-slate-500 transition-colors duration-200 hover:bg-slate-600 hover:shadow-lg hover:shadow-slate-600">
                                  Appointments
                                  <div className="absolute top-1  right-3 -mt-4 -mr-4 rounded-full border bg-slate-900 px-0.5 py-0.5">
                                    20
                                  </div>
                                </button>
                              </div>
                            </div>
                            <p className="md:text-md xl:text-md p-1 font-sans text-xs sm:text-xs lg:text-sm ">
                              Created At {Dateconverter(data.created_at)}
                            </p>
                            <div className="flex items-center justify-start  p-1">
                              <p className="md:text-md xl:text-md mr-1 text-xs font-semibold text-slate-400 sm:text-sm lg:text-sm xl:text-lg">
                                Store Type:{'  '}
                              </p>
                              <p className="items-center justify-center text-xs">
                                {data.store_type}
                              </p>
                            </div>
                            <div className="flex h-auto items-start justify-start  p-0.5">
                              <p className="md:text-md xl:text-md  text-xs font-semibold text-slate-400 sm:text-sm lg:text-sm xl:text-lg">
                                Description:{'  '}
                              </p>
                            </div>
                            <div className="h-10 overflow-hidden p-1  text-justify text-xs hover:h-auto hover:overflow-visible">
                              <p>{data.description}</p>
                            </div>
                            <div className="flex h-auto items-start justify-start  p-1">
                              <p className="md:text-md xl:text-md text-xs font-semibold text-slate-400 sm:text-sm lg:text-sm xl:text-lg">
                                Location:{'  '}
                              </p>
                            </div>
                            <p className="overflow-clip p-0.5 text-xs ">
                              {data.location}
                            </p>
                          </div>
                        </div>
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
                        className="col-start-2 col-end-12 mx-auto mb-2 mt-6 w-10/12 items-center justify-center"
                      >
                        {/* delete store */}
                        {Delstore && (
                          <div className="bottom-2 m-1 mx-auto block h-auto  w-full items-center justify-center rounded-md  bg-gray-400 p-2">
                            <div className="flex-auto justify-center p-2 text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="-m-1 mx-auto flex h-5 w-5 items-center text-red-500"
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
                              <h3 className="py-4 text-xl font-bold ">
                                Are you sure?
                              </h3>
                              <p className="px-8 text-sm text-gray-500">
                                Do you really want to delete `( {data.storename}{' '}
                                )` store? This process cannot be undone
                              </p>
                            </div>
                            <div className="mt-2  space-x-4 p-3 text-center md:block">
                              <button
                                type="button"
                                onClick={() => Delstoresetter()}
                                className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  delstrhandler(data.storename)
                                }}
                                className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                        {/* delete store */}
                        {/* update store */}
                        {UpdStore && (
                          <div className="bottom-2 m-1 mx-auto block h-auto  w-full items-center justify-center rounded-md  bg-gray-400 p-2">
                            <form
                              onSubmit={(e) => {
                                updstrhandler(e)
                              }}
                            >
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <input
                                    className="flex"
                                    onChange={(e) => {
                                      setstorename(e.target.value),
                                        setExistname(false)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Storename"
                                    type="text"
                                    defaultValue={data.storename}
                                    name="storename"
                                  />
                                </div>
                              </div>
                              {Existname &&
                                Warnmsg(storename + ' already exists ❕ 😅')}
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <textarea
                                    className="flex"
                                    onChange={(e) => {
                                      setdescription(e.target.value)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3  font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Description"
                                    type="text"
                                    defaultValue={data.description}
                                    name="description"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                                  Optional
                                </p>
                                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                                  <input
                                    className="flex"
                                    onChange={(e) => {
                                      setlocation(e.target.value)
                                    }}
                                    className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                                    id="Location"
                                    type="location"
                                    defaultValue={data.location}
                                    name="location"
                                  />
                                </div>
                              </div>
                              {/*  */}
                              <div className="mx-auto flex w-2/4  items-center justify-center py-3 px-1">
                                <div className="focus:shadow-outline items-center justify-center rounded-full font-semibold shadow-2xl shadow-slate-600">
                                  <div className=" mx-auto w-full cursor-pointer items-center justify-center rounded-full bg-green-500 py-1 text-white hover:animate-pulse hover:bg-green-700">
                                    <div className="mx-auto flex w-full items-center justify-center text-xl font-medium">
                                      <Icon
                                        className="mr-2 block h-10 w-10"
                                        icon="bx:image-add"
                                      />
                                    </div>
                                    <input
                                      onChange={(e) =>
                                        setimg(e.target.files[0])
                                      }
                                      accept=".png, .jpg, .jpeg"
                                      className="mx-auto flex w-full cursor-pointer items-center justify-center font-medium file:opacity-0"
                                      type="file"
                                      name="img"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/*  */}
                              {/* <!--footer--> */}
                              <div className="mt-2  space-x-4 p-3 text-center md:block">
                                <button
                                  type="button"
                                  onClick={() => UpdStoresetter()}
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
                        )}
                        {/* update store */}
                        <div className=" items-cnter m-1 mx-auto block h-auto w-full justify-between rounded-md bg-gray-400 p-4 shadow-lg shadow-gray-700 md:flex lg:flex xl:flex">
                          <div className="flex h-64 w-full  justify-center rounded-md bg-gray-400 bg-cover md:w-5/12 lg:w-5/12 xl:w-fit">
                            <Image
                              className="mx-auto w-full rounded-md"
                              src={BaseUrl + data.img}
                              alt="Store backgroundImage"
                              width={'300%'}
                              height={'300%'}
                              placeholder="blur"
                              blurDataURL="/placeholder.png"
                            />
                          </div>
                          <div className=" w-full items-center justify-end p-1">
                            <div className="sm:text-md  block  items-center justify-between  p-1  text-xs font-semibold sm:flex md:flex md:text-xl lg:flex lg:text-xl xl:flex xl:text-2xl">
                              <p className="text-slate-800 ">
                                {data.storename}
                              </p>

                              <div className="relative block h-auto items-end justify-center ">
                                <button
                                  type="button"
                                  onClick={() => {
                                    UpdStoresetter(), setStore_id(data.id)
                                  }}
                                  className="m-1 rounded-full bg-slate-800 p-2 text-sm font-semibold text-gray-100 shadow-md shadow-slate-500  transition-colors duration-200 hover:bg-slate-900 hover:shadow-lg   hover:shadow-slate-600 "
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    Delstoresetter(), setStore_id(data.id)
                                  }}
                                  className="m-1 rounded-full bg-slate-800 p-2 text-sm font-semibold text-gray-100 shadow-md   shadow-slate-500 transition-colors duration-200 hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-600 "
                                >
                                  Delete
                                </button>
                                <button className="relative m-1 overflow-visible rounded-full bg-slate-800 p-2 text-sm font-semibold   text-gray-100 shadow-md shadow-slate-500 transition-colors duration-200 hover:bg-slate-900 hover:shadow-lg hover:shadow-slate-600">
                                  Appointments
                                  <div className="absolute top-1  right-3 -mt-4 -mr-4 rounded-full border bg-slate-500 px-0.5 py-0.5">
                                    20
                                  </div>
                                </button>
                              </div>
                            </div>
                            <p className="md:text-md xl:text-md p-1 font-sans text-xs sm:text-xs lg:text-sm ">
                              Created At {Dateconverter(data.created_at)}
                            </p>
                            <div className="flex items-center justify-start  p-1">
                              <p className="md:text-md xl:text-md mr-1 text-xs font-semibold text-slate-900 sm:text-sm lg:text-sm xl:text-lg">
                                Store Type:{'  '}
                              </p>
                              <p className="items-center justify-center text-xs">
                                {data.store_type}
                              </p>
                            </div>
                            <div className="flex h-auto items-start justify-start  p-0.5">
                              <p className="md:text-md xl:text-md  text-xs font-semibold text-slate-900 sm:text-sm lg:text-sm xl:text-lg">
                                Description:{'  '}
                              </p>
                            </div>
                            <div className="h-10 overflow-hidden p-1  text-justify text-xs hover:h-auto hover:overflow-visible">
                              <p>{data.description}</p>
                            </div>
                            <div className="flex h-auto items-start justify-start  p-1">
                              <p className="md:text-md xl:text-md text-xs font-semibold text-slate-900 sm:text-sm lg:text-sm xl:text-lg">
                                Location:{'  '}
                              </p>
                            </div>
                            <p className="overflow-clip p-0.5 text-xs ">
                              {data.location}
                            </p>
                          </div>
                        </div>
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
    </>
  )
}
