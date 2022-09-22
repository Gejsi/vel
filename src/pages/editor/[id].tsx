import type { Value } from '@udecode/plate-core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Editor from '../../components/editor/Editor'
import IconsToolbar from '../../components/editor/IconsToolbar'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import useDebouncedCallback from '../../hooks/use-debounced-callback'
import type { JsonValue } from '../../types/json'
import { useMutation, useQuery } from '../../utils/trpc'
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

  const { mutate: saveCard, isLoading: isSaving } = useMutation(['card.save'], {
    onSuccess() {
      console.log('successfully saved to db')
    },
    onError() {
      console.log('error while saving to db')
    },
  })

  const handleChange = useDebouncedCallback(
    (question: Value, answer: Value, cardId: number) => {
      saveCard({
        question: question as JsonValue,
        answer: answer as JsonValue,
        cardId,
        deckId: parseInt(id as string, 10),
      })
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

      <IconsToolbar>
        <button className='btn loading btn-ghost p-0'>Saving</button>
      </IconsToolbar>

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

            <Editor count={1} onChange={handleChange} id={40} />
            <Editor count={2} onChange={handleChange} id={50} />
          </>
        )}
      </div>
    </>
  )
}

export default EditorPage
