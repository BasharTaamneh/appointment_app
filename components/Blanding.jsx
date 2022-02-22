import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import Authaxios from '../components/Authaxios'
import useSWR, { mutate } from 'swr'
// *******************
import Newstore from './newstore'
import Deleteaccount from './deleteaccount'
import Updateaccount from './updatprofile'
import Buyerstrlist from './Bstorelist'

// *******************
export default function Buyerland() {
  mutate()
  const [Theme, setTheme] = useState(true)
  const [Hover, setHover] = useState(false)
  const [Accdelshow, setAccdelshow] = useState(false)
  const [Accupdshow, setAccupdshow] = useState(false)
  // const [Storescount, setStorescount] = useState('')
  const [Search, setSearch] = useState('')
  const router = useRouter()

  // *************************************************
  // UserData
  function UserData() {
    const userprofileURL = '/users/user-profile'
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
    const { data, error, mutate } = useSWR(userprofileURL, fetchResource)
    return {
      data: data,
      loading: !data && !error,
    }
  }
  const { data, loading } = UserData()

  // *************************************************

  function Accdelshowsetter() {
    setAccdelshow(false)
  }

  function Accupdshowsetter() {
    setAccupdshow(false)
  }

  useEffect(() => {
    if (!('theme' in localStorage)) {
      localStorage.theme = 'dark'
    } else {
      if (localStorage.theme === 'light') {
        setTheme(false)
      }
    }
  }, [])

  function theme() {
    if (localStorage.theme === 'light') {
      localStorage.theme = 'dark'
      setTheme(true)
    } else if (localStorage.theme === 'dark') {
      localStorage.theme = 'light'
      setTheme(false)
    }
  }

  return (
    <>
      <div
        className={
          Theme
            ? 'z-0  flex min-h-screen flex-auto flex-shrink-0 flex-col items-center justify-start bg-gray-700 text-white  antialiased transition-all duration-1000 '
            : 'z-0 flex min-h-screen flex-auto flex-shrink-0 flex-col items-center justify-start bg-gray-200 text-black  antialiased transition-all duration-1000 '
        }
      >
        {/* <!-- Header --> */}
        {!Hover && (
          <div className="z-9 block h-14 w-full items-center justify-between text-white transition-all duration-1000">
            <div
              className={
                Theme
                  ? 'z-1000 flex h-16 w-full items-center bg-gray-900 px-2 transition-all duration-1000'
                  : 'z-1000 flex h-16 w-full items-center bg-gray-400 px-2 shadow-md shadow-slate-500 transition-all duration-1000'
              }
            >
              <div className="mr-4 ml-12 flex w-28 max-w-2xl items-center rounded border border-gray-200 bg-white p-2 shadow-sm sm:w-fit  md:w-fit lg:w-fit">
                <button
                  type="button"
                  onClick={() => mutate()}
                  className="outline-none focus:outline-none"
                >
                  <Icon
                    className="h-6 w-6 text-gray-600"
                    icon="fluent:clipboard-search-24-regular"
                  />
                </button>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={Search}
                  type="search"
                  name="search"
                  placeholder="Search For Stores"
                  className="w-full bg-transparent pl-3 text-sm text-black outline-none focus:outline-none"
                />
              </div>
              <ul className="flex items-center ">
                <li>
                  <button
                    onClick={() => theme()}
                    type="button"
                    className={
                      Theme
                        ? 'group mt-2  items-center justify-center rounded-full   bg-gray-50 text-gray-900 transition-colors duration-200 hover:bg-gray-400'
                        : 'group mt-2  items-center justify-center rounded-full bg-gray-400  text-gray-100 shadow-2xl shadow-slate-900 transition-colors duration-200 hover:bg-gray-500 hover:text-gray-50 '
                    }
                  >
                    {Theme ? (
                      <Icon className="h-8 w-8" icon="la:sun" />
                    ) : (
                      <Icon className="h-8 w-8" icon="bi:moon-stars-fill" />
                    )}
                  </button>
                </li>
                <li>
                  <span className="mx-2 block h-10 w-px bg-gray-500 "></span>
                </li>
                <li className="absolute right-3 ">
                  <div
                    className={
                      Theme
                        ? 'sm:w-22 group mx-auto mt-2 flex h-10  w-16 items-center justify-center overflow-hidden rounded-full bg-gray-50 px-4 font-semibold text-gray-900 transition-colors  duration-500 hover:w-full hover:bg-gray-400 md:w-full lg:w-full'
                        : 'sm:w-22 group mx-auto mt-2 flex h-10 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-500 px-4 text-gray-100 shadow-2xl  shadow-slate-900  transition-colors duration-500 hover:w-full hover:bg-gray-600 hover:text-gray-50 hover:shadow-sm hover:shadow-slate-300 md:w-full lg:w-full'
                    }
                  >
                    {!loading ? (
                      data.data.username
                    ) : (
                      <Icon
                        className=" h-8 w-8 animate-spin"
                        icon="icomoon-free:spinner10"
                      />
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* <!-- ./Header -->*/}
        {/* main body content */}
        {!Hover && (
          <>
            <div
              id="storeContainer"
              className="ml-12 grid w-10/12  grid-cols-1 grid-rows-2 gap-1  px-4 py-4  md:mx-auto md:grid-cols-2 md:gap-8 lg:grid-cols-2 2xl:grid-cols-3"
            >
              <Buyerstrlist search={Search} Theme={Theme} />
            </div>
          </>
        )}
        {/* main body content */}

        {/*  Sidebar  */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="sidebar fixed left-0 flex min-h-screen w-12 flex-col border-none bg-slate-900  text-white transition-all duration-300 hover:w-72 md:w-12"
        >
          <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col space-y-1 py-4">
              <li className={Hover ? 'block px-5 ' : 'hidden'}>
                <div className="mt-5 flex h-8 flex-row items-center">
                  <div className="text-sm font-semibold uppercase tracking-wide text-gray-100">
                    {!loading ? (
                      data.data.email
                    ) : (
                      <Icon
                        className=" h-8 w-8 animate-spin"
                        icon="icomoon-free:spinner10"
                      />
                    )}
                  </div>
                </div>
              </li>
              <li className={Hover ? 'block px-5 ' : 'hidden'}>
                <div className="mt-5 flex h-8 flex-row items-center">
                  <div
                    className={
                      Theme
                        ? 'text-sm font-semibold uppercase tracking-wide text-gray-400'
                        : 'text-sm font-semibold uppercase tracking-wide text-gray-200'
                    }
                  >
                    Settings
                  </div>
                </div>
              </li>
              <li>
                <div className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600">
                  <span className="ml-3 inline-flex items-center justify-center">
                    <Icon className="h-6 w-6" icon="gg:profile" />
                  </span>
                  <button onClick={() => setAccupdshow(true)}>
                    <span className="ml-4 truncate text-sm font-semibold tracking-wide">
                      Update Profile
                    </span>
                  </button>
                </div>
              </li>
              <li>
                <div className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600">
                  <span className="ml-3 inline-flex items-center justify-center">
                    <Icon
                      className="h-6 w-6"
                      icon="icon-park-outline:people-delete-one"
                    />
                  </span>
                  <button onClick={() => setAccdelshow(true)}>
                    <span className="ml-4 truncate text-sm font-semibold tracking-wide">
                      Delete Account
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- Sidebar  */}
        {/*  menue  */}
        <div
          className={
            Hover
              ? `sidebar absolute top-14 right-0 flex h-fit w-10 flex-col rounded-md border-none bg-gray-400 transition-all duration-1000 md:top-20 ${
                  Theme ? 'dark:bg-gray-900' : ''
                }  text-white transition-all duration-300 hover:w-fit md:w-10 `
              : `sidebar absolute top-28 right-0 flex h-fit w-10 flex-col rounded-md border-none bg-gray-400 transition-all duration-1000 md:top-36 ${
                  Theme ? 'dark:bg-gray-900' : ''
                } text-white  shadow-gray-800 transition-all duration-300 hover:w-fit md:w-10 `
          }
        >
          <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col space-y-1 py-4">
              <div className="absolute left-0 top-0 h-full w-2 items-center justify-center rounded-md bg-slate-600">
                <Icon icon="ant-design:left-outlined" className="h-6 w-6" />
              </div>
              <div
                // onClick={() =>}
                className="text-white-600 hover:text-white-800 relative flex h-11 cursor-context-menu flex-row items-center border-l-4 border-transparent pr-6 hover:border-blue-500 hover:bg-blue-800 focus:outline-none dark:hover:border-gray-800 dark:hover:bg-gray-600"
              >
                <span className="ml-1.5 inline-flex cursor-context-menu items-center justify-center">
                  <Icon
                    className="h-6 w-6"
                    icon="teenyicons:appointments-outline"
                  />
                </span>
                <span className="ml-4 cursor-context-menu truncate text-lg font-semibold tracking-wide">
                  Appointments
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- menue  */}
      </div>

      {/* delete account cofermation */}
      {Accdelshow && <Deleteaccount Accdelshowsetter={Accdelshowsetter} />}
      {/* delete account cofermation */}
      {/* update profile */}
      {Accupdshow && (
        <Updateaccount
          Accupdshowsetter={Accupdshowsetter}
          username={!loading && data.data.username}
          email={!loading && data.data.email}
          account={!loading && data.data.account_type}
        />
      )}
      {/* update profile */}
    </>
  )
}
