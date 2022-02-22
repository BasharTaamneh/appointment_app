import { useState } from 'react'
import Authaxios from '../components/Authaxios'
import Sucssmsg from './sucssmsg'
import Warnmsg from './warnmsg'
import { Icon } from '@iconify/react'
import { mutate } from 'swr'

export default function Updstore({
  storename,
  location,
  description,
  store_id,
  UpdStoresetter,
}) {
  const [img, setimg] = useState()
  const [Storename, setStorename] = useState()
  const [Location, setLocation] = useState()
  const [Description, setDescription] = useState()
  const [Existname, setExistname] = useState(false)
  const [Success, setSuccess] = useState(false)
  const storeupdateURL = '/stores/updateStore'

  function Succupdstr() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 20000)
    setTimeout(() => UpdStoresetter(), 2000)
  }

  async function updstrhandler(e) {
    e.preventDefault()
    const formData = new FormData()
    Storename && formData.append('storename', Storename)
    Location && formData.append('location', Location)
    Description && formData.append('description', Description)
    img && formData.append('img', img)
    formData.append('store_id', store_id)

    await Authaxios()
      .put(storeupdateURL, formData)
      .then((response) => {
        response && Succupdstr()
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
  mutate()
  return (
    <>
      <div>
        <div
          className="z-1000 fixed left-4 top-5 flex  min-h-screen w-full items-center justify-center bg-gray-400 bg-opacity-10 shadow-sm backdrop-blur-md backdrop-filter sm:top-5 md:top-16 lg:top-16 xl:top-16 
        "
        >
          {Success ? (
            Sucssmsg(storename + ' store has been successfully Updated 😎')
          ) : (
            <div className="m-1 mx-auto block  h-auto  max-w-2xl w-3/4 items-center justify-center rounded-md bg-gray-100 p-2">
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
                        setStorename(e.target.value), setExistname(false)
                      }}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="Storename"
                      type="text"
                      defaultValue={storename}
                      name="storename"
                    />
                  </div>
                </div>
                {Existname && Warnmsg(Storename + ' already exists ❕ 😅')}
                <div>
                  <p className="mt-3 flex items-center justify-end px-1 text-sm text-gray-500">
                    Optional
                  </p>
                  <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                    <textarea
                      className="flex"
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3  font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="Description"
                      type="text"
                      defaultValue={description}
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
                        setLocation(e.target.value)
                      }}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="Location"
                      type="location"
                      defaultValue={location}
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
                        onChange={(e) => setimg(e.target.files[0])}
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
        </div>
      </div>
    </>
  )
}
