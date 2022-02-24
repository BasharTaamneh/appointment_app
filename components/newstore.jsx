import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Select from 'react-select'
import { options } from '../public/static/stores_categories'
import Errmsg from './errormsg'
import Warnmsg from './warnmsg'
import Sucssmsg from './sucssmsg'
import Authaxios from './Authaxios'
import {mutate} from 'swr'

export default function Newstore({ Addshowsetter }) {
  mutate()
  const Router = useRouter()
  const [Option, setOption] = useState('')
  const [Catogry, setCatogry] = useState(false)
  const [storename, setstorename] = useState()
  const [location, setlocation] = useState()
  const [description, setdescription] = useState()
  const [img, setimg] = useState()
  const [Success, setSuccess] = useState(false)
  const [Unique, setUnique] = useState(false)
  const createstoreUrl = '/stores/createStore'

  function SuccessHandler() {
    setSuccess(true)
    setTimeout(() => setSuccess(false), 20000)
    setTimeout(() => Addshowsetter(), 2000)
  }

  async function handler(e) {
    e.preventDefault()
    if (Option === '') {
      setCatogry(true)
    }
    if (Option.value != undefined) {
      setCatogry(false)
      const formData = new FormData()
      formData.append('storename', storename)
      formData.append('location', location)
      formData.append('description', description)
      formData.append('store_type', Option.value)
      formData.append('img', img)

      await Authaxios()
        .post(createstoreUrl, formData)
        .then((response) => {
          response && response.status == 200 ? SuccessHandler() : ''
        })
        .catch((err) => {
          ;;(err && err.response.data.message.includes('jwt')) ||
          err.response.data.message.includes('Token')
            ? (localStorage.removeItem('auth'), Router.reload())
            : err.response.data.message.includes('store validation failed')
            ? setUnique(true)
            : ''
        })
    }
  }

  return (
    <>
      {/* create store form */}
      <div>
        <div
          className="fixed left-0 top-12 flex  min-h-screen w-full items-center justify-center bg-gray-500 bg-opacity-40  shadow-xl backdrop-blur-sm backdrop-filter sm:top-12 md:top-20 lg:top-20 xl:top-20 
        "
        >
          <div className=" mx-auto mb-20 h-full w-11/12 max-w-5xl items-center justify-center py-2  ">
            {Success ? (
              Sucssmsg(storename + ' store has been successfully created 😎')
            ) : (
              <form
                id="createstore"
                className="mx-auto  max-w-2xl items-center justify-center rounded bg-white py-2 px-2 shadow-2xl shadow-slate-900"
                onSubmit={(e) => handler(e)}
              >
                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1 text-2xl font-semibold">
                  <h3 className="flex items-center justify-center">
                    Create Store{' '}
                    <Icon
                      className="h-8 w-8 animate-bounce shadow-md"
                      icon="mdi:store-edit"
                    />
                  </h3>
                </div>
                <div>
                  <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                    <input
                      className="flex"
                      onChange={(e) => {
                        setstorename(e.target.value), setUnique(false)
                      }}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="storename"
                      type="text"
                      placeholder="Store Name"
                      name="storename"
                      required
                    />
                  </div>
                  {/*  */}
                  {Unique && Warnmsg(storename + ' name already exists 📛')}
                  {/*  */}
                  <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                    <input
                      className="flex"
                      onChange={(e) => setlocation(e.target.value)}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="location"
                      type="location"
                      placeholder="Location"
                      name="location"
                      required
                    />
                  </div>
                  <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                    <textarea
                      form="createstore"
                      className="flex"
                      onChange={(e) => setdescription(e.target.value)}
                      className="focus:shadow-outline text-md flex w-full appearance-none rounded border px-3 py-2 font-semibold text-gray-900 shadow-md focus:outline-none"
                      id="description"
                      type="textarea"
                      placeholder="Description"
                      name="description"
                      required
                    />
                  </div>
                </div>
                {/*  */}
                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                  <Select
                    className="block w-full rounded-xl bg-green-400 pb-1 text-lg font-semibold capitalize text-black shadow-lg shadow-green-200 hover:pb-0 hover:shadow-sm hover:shadow-green-500"
                    options={options}
                    value={Option}
                    placeholder="Search in the available store's categories"
                    onChange={setOption}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        primary25: '#22c55e',
                        primary: 'lightgreen',
                      },
                    })}
                    id="select"
                    classNamePrefix="react-select"
                  />
                </div>
                {/*  */}
                {Catogry &&
                  Errmsg(
                    'Please select store category or select the (Other) option 😅 ❕'
                  )}
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
                <div className="mx-auto flex w-full  items-center justify-center py-1 px-1">
                  <div className="mt-2  space-x-4 p-3 text-center md:block">
                    <button
                      className="mb-2  items-center justify-center rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
                      onClick={() => {
                        Addshowsetter()
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mb-2 rounded-full border border-green-500 bg-green-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-green-600 hover:shadow-lg md:mb-0"
                    >
                      New Store
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      {/* create store form */}
    </>
  )
}
