import Head from 'next/head'
import { useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'
export default function Home() {

  const Router = useRouter()
  const { user } = useAuth()
  return (
    <>
      <Head>
        <title>Appointment App</title>
      </Head>

      {user && user.account_type === 'buyer'
        ? useEffect(() => {
          Router.push('./buyer_landing')
        }, [])
        : user && user.account_type === 'seller'
          ? useEffect(() => {
            Router.push('./seller_landing')
          }, [])
          : useEffect(() => {
            Router.push('./sign_in')
          }, [])}
    </>
  )
}
