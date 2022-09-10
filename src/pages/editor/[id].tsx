import Head from 'next/head'
import { useRouter } from 'next/router'
import Editor from '../../components/editor/Editor'
import Error from '../../components/Error'
import IconsToolbar from '../../components/IconsToolbar'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const { id } = useRouter().query
  const {
    data: deck,
    isLoading,
    error,
  } = useQuery(['deck.getById', { id: id as string }], {
    retry: false,
    refetchOnWindowFocus: false,
  })

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
        <title>Vel &#x2022; {deck?.title}</title>
      </Head>

      <IconsToolbar />

      {/* {isLoading ? <Spinner /> : <span>Editing deck #{id}</span>} */}

      <h1 className='mb-4 text-5xl font-bold'>{deck?.title}</h1>

      <Editor id={1} />
      <Editor id={2} />
    </>
  )
}

export default EditorPage
