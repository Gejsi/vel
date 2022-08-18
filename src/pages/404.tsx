import Link from 'next/link'
import HomeLayout from '../components/HomeLayout'
import type { NextPageWithLayout } from './_app'

const Custom404: NextPageWithLayout = () => (
  <div className='w-full grid place-content-center'>
    <h1 className='text-4xl text-center font-bold'>404</h1>
    <h2 className='text-2xl mb-8'>This page could not be found</h2>
    <Link href='/'>
      <a className='btn btn-outline'>Go back home</a>
    </Link>
  </div>
)

Custom404.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>
}

export default Custom404
