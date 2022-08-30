import Head from 'next/head'
import Toolbar from '../components/Toolbar'
import type { NextPageWithLayout } from './_app'

const Me: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Vel &#x2022; Profile</title>
      </Head>

      <Toolbar title='My Profile' />
      <span>Bro</span>
    </>
  )
}

export default Me
