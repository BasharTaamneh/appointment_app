import Head from 'next/head'
import Header  from './Heder'
import Footer from './Footer'
import BGImage from './BGImage'
export default function Loader() {
  return (
    <>
      <Head>
        <title>Loading ...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className="min-w-screen  inset-x-0 flex min-h-screen items-center justify-center bg-slate-400 bg-cover py-12"
        style={{
          backgroundImage: "url('./loading_02.gif')",
          backgroundSize: `${BGImage()?.width}px  ${BGImage()?.height}px`,
        }}
      >
      </div>
      <Footer />
    </>
  )
}
