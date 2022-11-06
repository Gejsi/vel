import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdDeviceHub } from 'react-icons/md'
import ErrorPage from '../../components/ErrorPage'
import Spinner from '../../components/Spinner'
import Toolbar from '../../components/Toolbar'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const Preview: NextPageWithLayout = () => {
  const deckId = useRouter().query.pid as string

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { deckId }], {
    retry: false,
  })

  if (queryError)
    return (
      <ErrorPage
        title={queryError.message}
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
          <MdDeviceHub className='mr-0 h-6 w-6 md:mr-2' />
          <span className='hidden md:block'>Study</span>
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
