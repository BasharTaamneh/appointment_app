import Head from 'next/head'
import { useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { useRouter } from 'next/router'
export default function Bacerout() {
  const Router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      if (user.account_type === 'buyer') {
        Router.push('./buyer_landing')
      }
      if (user.account_type === 'seller') {
        Router.push('./seller_landing')
      }
    } else {
      Router.push('./home')
    }
  })

  return (
    <>
      <Head>
        <title>Brand</title>
      </Head>
    </>
  )
}
