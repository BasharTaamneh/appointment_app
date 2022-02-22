import { useState } from 'react'
import Authaxios from '../components/Authaxios'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { mutate } from 'swr'

export default function Appointments({
  storename,
  store_id,
  Appointmentsetter,
}) {
  //   const [Storename, setStorename] = useState()
  //   const [Location, setLocation] = useState()
  //   const [Description, setDescription] = useState()
  //   const [Existname, setExistname] = useState(false)
  //   const [Success, setSuccess] = useState(false)
  //   const storeupdateURL = '/stores/updateStore'

  //   function Succhandler() {
  //     setSuccess(true)
  //     setTimeout(() => setSuccess(false), 500)
  //   }

  //   async function updstrhandler(e) {
  //     e.preventDefault()
  //     const formData = new FormData()
  //     Storename && formData.append('storename', Storename)
  //     Location && formData.append('location', Location)
  //     Description && formData.append('description', Description)
  //     img && formData.append('img', img)
  //     formData.append('store_id', store_id)

  //     await Authaxios()
  //       .put(storeupdateURL, formData)
  //       .then((response) => {
  //         response && Succupdstr()
  //       })
  //       .catch((err) => {
  //         ;(err && err.response.data.message.includes('jwt')) ||
  //         err.response.data.message.includes('Token')
  //           ? (localStorage.removeItem('auth'), Router.reload())
  //           : err.response.data.message.includes('storename')
  //           ? setExistname(true)
  //           : ''
  //       })
  //   }
  mutate()
  return (
    <>
      <div>
        <div
          className="z-1000 fixed left-4 top-5 flex  min-h-screen w-full items-center justify-center bg-gray-400 bg-opacity-10 shadow-md backdrop-blur-md backdrop-filter sm:top-5 md:top-16 lg:top-16 xl:top-16 
        "
        >
          <div className=" max-h-6xl m-1 mx-auto  block   w-3/4 max-w-6xl items-center justify-center rounded-md bg-gray-100 p-2">
            {/* close */}
            <div className="m-2 flex items-center justify-end">
              <button
                onClick={() => Appointmentsetter()}
                className="rounded-md bg-red-500 shadow-md shadow-slate-700 transition-all duration-100 hover:bg-red-600 hover:shadow-sm"
              >
                <Icon icon="line-md:close" className="block h-8 w-8" />
              </button>
            </div>
            {/* close */}
            {true ? (
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
                {/* loading Appointment */}
                {/* <div className="flex h-auto w-full items-center justify-center rounded-sm bg-cover">
                  <Image
                    className="w-full rounded-full"
                    src="/cuteloading.gif"
                    width={'450%'}
                    height={'450%'}
                  />
                </div> */}
                {/* loading Appointment */}
              </>
            ) : (
              <>
                {/* Appointments Data */}
                <div className="h-96 w-auto snap-y overflow-y-scroll p-2 ">
                  {/* taple */}
                  <div className="my-8 table w-full overflow-x-scroll rounded-md bg-blue-200 shadow-lg shadow-slate-600 ring-2 ring-blue-500 ring-offset-4 ring-offset-blue-100">
                    <div className=" table-header-group">
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
                        <div className="table-cell px-2">The Sliding</div>
                        <div className="table-cell px-2">pending</div>
                        <div className="table-cell px-2">1961</div>
                        <div className="table-cell px-2">
                          <button className="mx-2 my-2 rounded-full bg-green-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-green-600 hover:shadow-sm hover:shadow-slate-500">
                            Accept
                          </button>
                          <button className="mx-2 my-2 rounded-full bg-red-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-red-600 hover:shadow-sm hover:shadow-slate-500">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* taple */}
                  {/* taple */}
                  <div className="my-8 table w-full overflow-x-scroll rounded-md bg-green-200 shadow-lg shadow-slate-600 ring-2 ring-green-500 ring-offset-4 ring-offset-green-100">
                    <div className=" table-header-group">
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
                        <div className="table-cell px-2">The Sliding</div>
                        <div className="table-cell px-2">Accepted</div>
                        <div className="table-cell px-2">1961</div>
                        <div className="table-cell px-2">
                          <button className="mx-2 my-2 rounded-full bg-gray-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-gray-600 hover:shadow-sm hover:shadow-slate-500">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* taple */}
                  {/* taple */}
                  <div className="my-8 table w-full overflow-x-scroll rounded-md bg-red-200 shadow-lg shadow-slate-600 ring-2 ring-red-500 ring-offset-4 ring-offset-red-100">
                    <div className=" table-header-group">
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
                        <div className="table-cell px-2">The Sliding</div>
                        <div className="table-cell px-2">Rejected</div>
                        <div className="table-cell px-2">1961</div>
                        <div className="table-cell px-2">
                          <button className="mx-2 my-2 rounded-full bg-green-500 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-green-600 hover:shadow-sm hover:shadow-slate-500">
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* taple */}
                  {/* taple */}
                  <div className="my-8 table w-full overflow-x-scroll rounded-md bg-gray-200 shadow-lg shadow-slate-600 ring-2 ring-slate-500 ring-offset-4 ring-offset-slate-100">
                    <div className=" table-header-group">
                      <div className="table-row">
                        <div className="table-cell px-2 text-left font-bold">
                          User
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
                        <div className="table-cell px-2">The Sliding</div>
                        <div className="table-cell px-2">Canceled</div>
                        <div className="table-cell px-2">
                          <button className="mx-2 my-2 rounded-full bg-rose-600 p-2 shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-rose-800 hover:shadow-sm hover:shadow-slate-500">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* taple */}
                </div>
                {/* Appointments Data */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
