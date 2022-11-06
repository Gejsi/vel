import type { JSONContent } from '@tiptap/react'
import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { toast } from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import IconsToolbar from '../../components/editor/IconsToolbar'
import TwinEditor from '../../components/editor/TwinEditor'
import EmptyFigure from '../../components/EmptyFigure'
import ErrorPage from '../../components/ErrorPage'
import Spinner from '../../components/Spinner'
import useDebouncedCallback from '../../hooks/use-debounced-callback'
import useOptimisticUpdate from '../../hooks/use-optimistic-update'
import type { JsonValue } from '../../types/json'
import {
  useContext,
  useMutation,
  useQuery,
  type inferMutationInput,
  type inferQueryOutput,
} from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const deckId = useRouter().query.id as string
  const utils = useContext()
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { deckId: deckId }], {
    retry: false,
  })

  const { mutate: saveCard } = useMutation(['card.save'], {
    onMutate() {
      toast.loading('Saving...', { id: 'autosave-toast' })
    },
    onError() {
      toast.error('Unable to save', { id: 'autosave-toast' })
      utils.invalidateQueries(['deck.getById', { deckId }])
    },
    onSuccess() {
      toast.success('Saved', { id: 'autosave-toast' })
      utils.invalidateQueries(['deck.getById', { deckId }])
    },
  })

  const { mutate: createCard, isLoading: isCreating } = useMutation(
    ['card.create'],
    {
      onError() {
        toast.error('Unable to create a new card')
      },
      async onSuccess() {
        await utils.invalidateQueries(['deck.getById', { deckId }])
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
      },
    }
  )

  const { mutate: deleteCard } = useOptimisticUpdate({
    mutationKey: 'card.delete',
    invalidatedQueryKey: ['deck.getById', { deckId }],
    updateQueryData: (
      prevData: inferQueryOutput<'deck.getById'>,
      input: inferMutationInput<'card.delete'>
    ) => ({
      ...prevData,
      cards: [...prevData.cards.filter((card) => card.id !== input.cardId)],
    }),
    toastOptions: {
      loading: 'Deleting card...',
      error: 'Unable to delete card',
      success: 'Deleted card',
      id: 'delete-card-toast',
    },
  })

  const handleChange = useDebouncedCallback(
    (
      question: JSONContent[] | undefined,
      answer: JSONContent[] | undefined,
      cardId: number
    ) => {
      saveCard({
        question: question as JsonValue,
        answer: answer as JsonValue,
        cardId,
        deckId: deckId,
      })
    },
    600
  )

  const ctaClassName = useMemo(
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

      <IconsToolbar>
        <button
          className={ctaClassName}
          onClick={() => createCard({ deckId: deckId })}
        >
          {!isCreating && <MdAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Add Flashcard</span>
        </button>
      </IconsToolbar>

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

          {deck?.cards.length === 0 ? (
            <EmptyFigure
              secondary
              caption='This deck is empty. Create some flashcards!'
            />
          ) : (
            deck?.cards.map((card, i) => (
              <TwinEditor
                key={card.id}
                count={i + 1}
                initialQuestion={card.question as JSONContent[]}
                initialAnswer={card.answer as JSONContent[]}
                onChange={(question, answer) =>
                  handleChange(question, answer, card.id)
                }
                onDelete={() => deleteCard({ cardId: card.id, deckId: deckId })}
              />
            ))
          )}
        </>
      )}

      <div className='pointer-events-none pt-72 md:pt-48' ref={scrollRef} />
    </>
  )
}

export default EditorPage
