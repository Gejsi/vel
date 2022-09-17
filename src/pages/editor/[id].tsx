import type { Value } from '@udecode/plate-core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Editor from '../../components/editor/Editor'
import IconsToolbar from '../../components/editor/IconsToolbar'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
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

  const handleChange = (question: Value, answer: Value) => {
    console.log(question, answer)
  }

  return (
    <>
      <Head>
        <title>Vel &#x2022; {deck?.title}</title>
      </Head>

      <IconsToolbar />

      <div className='px-4 lg:px-8'>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='mb-4 text-5xl font-bold'>{deck?.title}</h1>

            {/* {deck?.cards.map((card, i) => (
              <Editor key={i} id={i + 1} />
            ))} */}

            {/* {deck?.cards.length === 0 && (
              <>
                <EmptyFigure
                  secondary
                  caption='This deck is empty. Create some flashcards!'
                />

                <div className='flex justify-center'>
                  <button
                    className='btn w-full tracking-wide md:w-3/6'
                    onClick={() => addCard}
                  >
                    <MdAdd className='mr-2 h-6 w-6' />
                    Add Flashcard
                  </button>
                </div>
              </>
            )} */}

            <Editor id={1} onChange={handleChange} />
            <Editor id={2} />
          </>
        )}
      </div>
    </>
  )
}

export default EditorPage
