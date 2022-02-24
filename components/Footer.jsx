import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <footer className="static inset-x-0 bottom-0 z-10 flex h-fit w-full items-center justify-center  bg-slate-900    ">
        <div className="justify-left max-w-9xl m-auto ml-16 flex flex-wrap text-gray-800  xl:mx-auto">
          {/* <!-- Col-1 --> */}
          <div className="  w-1/2 p-5 sm:w-4/12 md:w-3/12">
            {/* <!-- Col Title --> */}
            <div className="mb-6 text-xs font-medium uppercase text-gray-400">
              Getting Started
            </div>

            {/* <!-- Links --> */}
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Installation
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Release Notes
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Upgrade Guide
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Using with Preprocessors
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Optimizing for Production
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Browser Support
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              IntelliSense
            </a>
          </div>

          {/* <!-- Col-2 --> */}
          <div className="w-1/2 p-5 sm:w-4/12 md:w-3/12">
            {/* <!-- Col Title --> */}
            <div className="mb-6 text-xs font-medium uppercase text-gray-400">
              Core Concepts
            </div>

            {/* <!-- Links --> */}
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Utility-First
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Responsive Design
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Hover, Focus, & Other States
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Dark Mode
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Adding Base Styles
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Extracting Components
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Adding New Utilities
            </a>
          </div>

          {/* <!-- Col-3 --> */}
          <div className="w-1/2 p-5 sm:w-4/12 md:w-3/12">
            {/* <!-- Col Title --> */}
            <div className="mb-6 text-xs font-medium uppercase text-gray-400">
              Customization
            </div>

            {/* <!-- Links --> */}
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Configuration
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Theme Configuration
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Breakpoints
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Customizing Colors
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Customizing Spacing
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Configuring Variants
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Plugins
            </a>
          </div>

          {/* <!-- Col-3 --> */}
          <div className="w-1/2 p-5 sm:w-4/12 md:w-3/12">
            {/* <!-- Col Title --> */}
            <div className="mb-6 text-xs font-medium uppercase text-gray-400">
              Community
            </div>

            {/* <!-- Links --> */}
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              GitHub
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Discord
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              Twitter
            </a>
            <a
              href="#"
              className="my-3 block text-sm font-medium text-gray-300 duration-700 hover:text-gray-100"
            >
              YouTube
            </a>
          </div>

          <div className="w-full pt-2">
            <div
              className="m-auto flex w-full max-w-6xl flex-col border-t 
            border-gray-400 px-3 pb-5 pt-5 
            text-sm text-gray-400 md:flex-row"
            >
              <div className="mt-2">
                © Copyright 2022 BASHAR TAAMNEH. All Rights Reserved.
              </div>

              <div className="mt-2 flex flex-row md:flex-auto md:flex-row-reverse">
                <a href="#" className="mx-1 w-6">
                  <Image
                    className="rounded-2xl"
                    src="/facebook.gif"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </a>
                <a href="#" className="mx-1 w-6">
                  <Image
                    className="rounded-2xl"
                    src="/twitter.gif"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </a>
                <a href="#" className="mx-1 w-6">
                  <Image
                    className="rounded-2xl"
                    src="/youtube.gif"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </a>
                <a href="#" className="mx-1 w-6">
                  <Image
                    className="rounded-2xl"
                    src="/linkedin.gif"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </a>
                <a href="#" className="mx-1 w-6">
                  <Image
                    className="rounded-2xl"
                    src="/instagram.gif"
                    alt="Picture of the author"
                    width={50}
                    height={50}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
