import type { JSONContent } from '@tiptap/react'
import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { MdAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import IconsToolbar from '../../components/editor/IconsToolbar'
import TwinEditor from '../../components/editor/TwinEditor'
import EmptyFigure from '../../components/EmptyFigure'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import useDebouncedCallback from '../../hooks/use-debounced-callback'
import type { JsonValue } from '../../types/json'
import { useContext, useMutation, useQuery } from '../../utils/trpc'
import type { NextPageWithLayout } from '../_app'

const EditorPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string
  const utils = useContext()

  const {
    data: deck,
    isLoading,
    error: queryError,
  } = useQuery(['deck.getById', { id }], {
    retry: false,
  })

  const { mutate: saveCard } = useMutation(['card.save'], {
    onMutate() {
      toast.loading('Saving...', { id: 'autosave-toast' })
    },
    onError() {
      utils.invalidateQueries(['deck.getById', { id }])
      toast.error('Unable to save', { id: 'autosave-toast' })
    },
    onSuccess() {
      utils.invalidateQueries(['deck.getById', { id }])
      toast.success('Saved', { id: 'autosave-toast' })
    },
  })

  const { mutate: createCard, isLoading: isCreating } = useMutation(
    ['card.create'],
    {
      onError() {
        toast.error('Unable to create a new card')
      },
      onSuccess() {
        utils.invalidateQueries(['deck.getById', { id }])
      },
    }
  )

  const { mutate: deleteCard } = useMutation(['card.delete'], {
    async onMutate(inputCard) {
      toast.loading('Deleting card...', { id: 'delete-toast' })
      await utils.cancelQuery(['deck.getById', { id }])
      const prevData = utils.getQueryData(['deck.getById', { id }])

      if (prevData)
        utils.setQueryData(['deck.getById', { id }], () => ({
          ...prevData,
          cards: [
            ...prevData.cards.filter((card) => card.id !== inputCard.cardId),
          ],
        }))

      return { prevData }
    },
    onError(err, inputCard, context) {
      toast.error('Unable to delete card', { id: 'delete-toast' })
      if (context?.prevData)
        utils.setQueryData(['deck.getById', { id }], context.prevData)
    },
    onSettled() {
      toast.success('Deleted card', { id: 'delete-toast' })
      utils.invalidateQueries(['deck.getById', { id }])
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
        deckId: parseInt(id, 10),
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
          className={ctaClassName}
          onClick={() => createCard({ deckId: parseInt(id, 10) })}
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
                <TwinEditor
                  key={card.id}
                  count={i + 1}
                  initialQuestion={card.question as JSONContent[]}
                  initialAnswer={card.answer as JSONContent[]}
                  onChange={(question, answer) =>
                    handleChange(question, answer, card.id)
                  }
                  onDelete={() =>
                    deleteCard({ cardId: card.id, deckId: parseInt(id, 10) })
                  }
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
