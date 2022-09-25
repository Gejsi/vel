import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from '../../components/Error'
import TwinEditor from '../../components/new-editor/TwinEditor'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const { id } = useRouter().query

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { id: id as string }], {
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (queryError)
    return (
      <Error
        title="This deck doesn't exist"
        statusCode={queryError.data?.httpStatus}
      />
    )

  return (
    <>
      <Head>
        <title>Vel &#x2022; {deck?.title}</title>
      </Head>

      <div className='px-4 lg:px-8'>
        <TwinEditor />
      </div>
    </>
  )
}

export default EditorPage
