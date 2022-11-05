import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdDeviceHub } from 'react-icons/md'
import ErrorPage from '../../components/ErrorPage'
import Spinner from '../../components/Spinner'
import Toolbar from '../../components/Toolbar'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const Preview: NextPageWithLayout = () => {
  const id = useRouter().query.pid as string

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { id }], {
    retry: false,
  })

  if (queryError)
    return (
      <ErrorPage
        title="This deck doesn't exist"
        statusCode={queryError.data?.httpStatus}
      />
    )

  return (
    <>
      <Head>
        <title>Vel &#x2022; {deck?.title}</title>
      </Head>

      <Toolbar title='Preview'>
        <button className='btn btn-primary'>
          <MdDeviceHub className='mr-2 h-6 w-6' />
          <span className='hidden md:block'>Create deck</span>
        </button>
      </Toolbar>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1
            className='my-8 truncate whitespace-normal text-4xl font-bold leading-tight'
            title={deck?.title}
          >
            {deck?.title}
          </h1>
        </>
      )}
    </>
  )
}

export default Preview
