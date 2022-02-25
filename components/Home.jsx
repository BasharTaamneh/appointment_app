import { useRouter } from 'next/router'
import useInView from 'react-cool-inview'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()
  const { observe, inView } = useInView()

  return (
    <>
      <div className="my-2  min-h-screen w-full items-start justify-center rounded-lg   px-2 py-10 shadow-slate-700 ">
        <div className="Brand mb-12 flex w-full">
          <motion.div
            className="mx-auto"
            animate={{
              y: [-400, 0],
              scale: [0, 1],
            }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
          >
            <div className="justify-canter mx-auto items-center">
              <h1 className="block text-6xl font-bold text-slate-700 md:text-9xl">
                Brand
              </h1>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto  h-full  w-full items-start justify-between py-10 md:flex">
          {/* Blubi */}
          <div className="Blubi block h-96 w-full max-w-lg items-center justify-center  sm:mx-auto md:mx-4">
            <div className="relative flex h-full w-3/4 items-center justify-end ">
              <div className="animation-delay-2000 absolute top-0  left-8 mx-auto h-2/4 w-11/12 animate-blob animate-pulse rounded-full bg-emerald-300 opacity-60 mix-blend-multiply blur-xl filter md:h-full "></div>
              <div className="animation-delay-3000 absolute left-1/3 top-12 mx-auto h-2/4 w-11/12 animate-blob animate-pulse rounded-full bg-yellow-200 opacity-60 mix-blend-multiply blur-xl filter md:h-full"></div>
              <div className="animation-delay-4000 absolute top-0 left-2/4 mx-auto h-2/4 w-11/12 animate-pulse animate-blob rounded-full bg-rose-400 opacity-60 mix-blend-multiply blur-xl filter md:h-full "></div>
              <div className="absolute -top-8 flex h-3/4 w-3/4 items-center justify-center md:top-8 md:-right-16">
                <Image
                  className=""
                  src="/logo.png"
                  alt="logo"
                  width={'300%'}
                  height={'300%'}
                />
              </div>
            </div>
          </div>
          {/* Blubi */}
          {/* intro */}
          <motion.div
            animate={{ x: -390 }}
            transition={{ type: 'spring', stiffness: 800 }}
          >
            <div
              className="Intro relative ml-96 block h-auto w-full items-center justify-center rounded-3xl bg-cover py-8 px-2 text-left font-sans text-4xl shadow-2xl shadow-slate-700  md:flex"
              style={{
                backgroundImage: "url('./appoint_1.gif')",
              }}
            >
              <div className="text-md my-16 rounded-md bg-slate-700 bg-opacity-70 p-8 text-2xl font-bold  shadow-xl shadow-slate-900 transition-all duration-1000">
                <blockquote className="m-1 items-center justify-center p-1 text-justify  text-lg font-semibold italic text-gray-100 ">
                  <span className="text-green-300">
                    To help buyers save their time, we decided to implement an
                    appointment booking system that will allow them to book
                    their appointment ahead of time before going to the service
                    provider.
                  </span>
                  <br />
                  <span className="relative m-2 inline-block p-1 shadow-md before:absolute before:-inset-1 before:block before:-skew-y-3 before:animate-pulse before:rounded-md before:bg-green-500 before:shadow-lg">
                    <span className="relative rounded-md p-1 text-white">
                      Brand
                    </span>
                  </span>
                  <span className="text-green-300">
                    allows the service provider to create multiple stores and
                    manage their pre-booked appointments through a smooth and
                    easy-to-use control panel. <br /> It also allows the
                    customer to search for stores, book appointments, modify
                    them, and check their status.
                  </span>
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
        {/* intro */}
        {/* get started */}
        <div
          ref={observe}
          className="mx-auto mt-10 flex h-full  w-11/12  items-center justify-between md:mt-24"
        >
          {inView && (
            <div>
              <motion.div
                animate={{ x: [-800, 180] }} transition={{delay:0.5}}
                className="relative -left-40 md:-left-34 lg:-left-20 xl:left-0 md:mx-auto my-4 flex h-full w-10/12 items-center justify-center "
              >
                <div className="flex items-end justify-center bg-cover">
                  <Image
                    className="rounded-full"
                    src="/appoint.gif"
                    alt="get started"
                    width={'900%'}
                    height={'600%'}
                  />
                </div>
                <div className="absolute mx-auto  my-auto flex">
                  <button
                    type="button"
                    onClick={() => {
                      router.push('./sign_up')
                    }}
                    className="flex rounded-full  bg-lime-500 p-4 text-2xl font-semibold text-white shadow-lg shadow-slate-700 transition-all duration-100 hover:bg-lime-700 hover:shadow-slate-400 hover:outline-double hover:outline-4  hover:outline-green-500"
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
        {/* get started */}
      </div>
    </>
  )
}
