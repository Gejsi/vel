import type { Value } from '@udecode/plate-core'
import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
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

  const { mutate: saveCard } = useMutation(['card.save'], {
    onMutate() {
      toast.loading('Saving...', { id: 'autosave-toast' })
    },
    onError() {
      utils.invalidateQueries(['deck.getById'])
      toast.error('Cannot save', { id: 'autosave-toast' })
    },
    onSuccess() {
      utils.invalidateQueries(['deck.getById'])
      toast.success('Saved', { id: 'autosave-toast' })
    },
  })

  const { mutate: createCard, isLoading: isCreating } = useMutation(
    ['card.create'],
    {
      onError() {
        toast.error('Cannot create a card')
      },
      onSuccess() {
        utils.invalidateQueries(['deck.getById'])
      },
    }
  )

  const { mutate: deleteCard } = useMutation(['card.delete'], {
    // onMutate() {
    //   toast.loading('Deleting card', { id: 'delete-toast' })
    // },
    // onError() {
    //   toast.error('Cannot delete card', { id: 'delete-toast' })
    // },
    async onSuccess() {
      utils.queryClient.resetQueries('deck.getById')
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

  const btnClass = useMemo(
    () =>
      twMerge(
        'btn btn-primary gap-2',
        clsx({
          loading: isCreating,
          'motion-safe:animate-wiggle': deck?.cards.length === 0,
        })
      ),
    [isCreating, deck?.cards.length]
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
          className={btnClass}
          onClick={() => createCard({ deckId: parseInt(id as string, 10) })}
        >
          {!isCreating && <MdAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Add Flashcard</span>
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
                  initialQuestion={card.question as Value}
                  initialAnswer={card.answer as Value}
                  onChange={(question, answer) =>
                    handleChange(question, answer, card.id)
                  }
                  onDelete={() => deleteCard({ cardId: card.id })}
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
