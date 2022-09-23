import type { Value } from '@udecode/plate-core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import Editor from '../../components/editor/Editor'
import IconsToolbar from '../../components/editor/IconsToolbar'
import EmptyFigure from '../../components/EmptyFigure'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import useDebouncedCallback from '../../hooks/use-debounced-callback'
import type { JsonValue } from '../../types/json'
import { useContext, useMutation, useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const { id } = useRouter().query
  const utils = useContext()

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { id: id as string }], {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const { mutate: saveCard, isLoading: isSaving } = useMutation(['card.save'], {
    onMutate() {
      toast.loading('Saving...', { id: 'save-toast' })
    },
    onSuccess() {
      utils.invalidateQueries(['deck.getById'])
      toast.success('Saved', {
        id: 'save-toast',
      })
    },
  })

  const { mutate: createCard } = useMutation(['card.create'], {
    onSuccess() {
      utils.invalidateQueries(['deck.getById'])
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
        <button
          className='btn btn-primary tracking-wide'
          onClick={() => createCard({ deckId: parseInt(id as string, 10) })}
        >
          <MdAdd className='h-6 w-6' />
          <span className='ml-2 hidden md:block'>Add Flashcard</span>
        </button>
      </IconsToolbar>

      <div className='px-4 lg:px-8'>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className='mb-4 text-5xl font-bold'>{deck?.title}</h1>

            {deck?.cards.length === 0 ? (
              <EmptyFigure
                secondary
                caption='This deck is empty. Create some flashcards!'
              />
            ) : (
              deck?.cards.map((card, i) => (
                <Editor
                  key={card.id}
                  count={i + 1}
                  onChange={handleChange}
                  id={card.id}
                  initialQuestion={card.question as Value}
                  initialAnswer={card.answer as Value}
                />
              ))
            )}
          </>
        )}
      </div>
    </>
  )
}

export default EditorPage
