import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Header() {
  const [NavbarOpen, setNavbarOpen] = useState(false)
  const [User, setUser] = useState(null)
  const Router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      setUser(JSON.parse(data))
    }
  }, [])

  return (
    <>
      <header className=" sticky inset-x-0 top-0 z-10 flex  w-full   bg-slate-800 shadow-lg shadow-slate-700 ">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a
                  className="px-2 text-xl font-bold text-white hover:animate-pulse md:text-2xl"
                  href="/"
                >
                  Brand
                </a>
                <Image
                  className="animate-pulse py-2"
                  src="/logo.png"
                  alt="logo"
                  width={'25%'}
                  height={'25%'}
                />
              </div>
              {/* <!-- Mobile menu button --> */}
              <div className="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
                <button
                  onClick={() => setNavbarOpen(!NavbarOpen)}
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div
              className={
                NavbarOpen
                  ? 'block'
                  : 'hidden' +
                    ' block items-center md:flex lg:flex xl:flex 2xl:flex'
              }
            >
              <div className="mt-2 flex flex-col md:mx-1 md:mt-0 md:flex-row">
                <a
                  className="my-1 text-sm leading-5 text-white hover:animate-bounce md:mx-4 md:my-0"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="my-1 text-sm leading-5 text-white hover:animate-bounce md:mx-4 md:my-0"
                  href="#"
                >
                  Blog
                </a>
                <a
                  className="my-1 text-sm leading-5 text-white hover:animate-bounce md:mx-4 md:my-0"
                  href="#"
                >
                  Compoents
                </a>
              </div>
              <div className="-mx-1 flex items-center py-2 md:mx-0">
                {User ? (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('auth')
                      Router.reload()
                    }}
                    className="mx-1 flex w-1/2 items-center rounded bg-gray-500 px-3 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-gray-700 hover:shadow-sm hover:shadow-slate-300 md:mx-2 md:w-auto"
                  >
                    <span className="mr-1 inline-flex">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </span>
                    Log Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      Router.push('./sign_in')
                    }}
                    className="mx-1 block w-1/2 rounded bg-gray-500 px-3 py-2 text-center text-sm font-medium leading-5 text-white hover:bg-blue-600 md:mx-2 md:w-auto"
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
