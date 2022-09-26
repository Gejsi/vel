import type { JSONContent } from '@tiptap/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from '../../components/Error'
import TwinEditor from '../../components/new-editor/TwinEditor'
import useDebouncedCallback from '../../hooks/use-debounced-callback'
import { useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const { id } = useRouter().query

  const { data: deck, error: queryError } = useQuery(
    ['deck.getById', { id: id as string }],
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  )

  const handleChange = useDebouncedCallback(
    (
      question: JSONContent[] | undefined,
      answer: JSONContent[] | undefined,
      cardId: number
    ) => {
      console.log(question, answer, cardId)
    },
    600
  )

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
        <h1 className='mb-4 text-5xl font-bold'>{deck?.title}</h1>
        <TwinEditor
          count={1}
          initialQuestion={undefined}
          initialAnswer={undefined}
          onChange={(question, answer) => handleChange(question, answer, 10)}
          onDelete={() => console.log('delete')}
        />

        <TwinEditor
          count={2}
          initialQuestion={undefined}
          initialAnswer={undefined}
          onChange={(question, answer) => handleChange(question, answer, 30)}
          onDelete={() => console.log('delete')}
        />
      </div>
    </>
  )
}

export default EditorPage
