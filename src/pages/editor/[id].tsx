import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import Toolbar from '../../components/Toolbar'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const Editor: NextPageWithLayout = () => {
  const { id } = useRouter().query
  const { data, isLoading, error } = useQuery(
    ['deck.getById', { id: id as string }],
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  if (error)
    return (
      <Error
        title="This deck doesn't exist"
        statusCode={error.data?.httpStatus}
      />
    )

  return (
    <>
      <Head>
        <title>Vel &#x2022; {data?.title}</title>
      </Head>

      <Toolbar title='Editor' />

      {error && 'Nothing here man'}
      {isLoading ? <Spinner /> : <span>Editing deck #{id}</span>}
    </>
  )
}

export default Editor
