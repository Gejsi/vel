import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { MdPostAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import DeckCard from '../components/DeckCard'
import EmptyFigure from '../components/EmptyFigure'
import Spinner from '../components/Spinner'
import Toolbar from '../components/Toolbar'
import useOptimisticUpdate from '../hooks/use-optimistic-update'
import {
  useContext,
  useMutation,
  useQuery,
  type inferMutationInput,
  type inferQueryOutput,
} from '../utils/trpc'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  const router = useRouter()
  const utils = useContext()

  const { data: decks, isLoading: queryLoading } = useQuery(['deck.getAll'], {
    refetchOnMount: 'always',
  })

  const { mutate: createDeck, isLoading: isCreating } = useMutation(
    'deck.create',
    {
      async onSuccess({ id }) {
        await utils.invalidateQueries(['deck.getAll'])
        await router.push(`/edit/${id}`)
      },
    }
  )

  const { mutate: renameDeck } = useMutation('deck.rename', {
    onMutate({ deckId: id }) {
      toast.loading('Renaming deck', { id: id + '-toast' })
    },
    onError(_, { deckId: id }) {
      toast.error('Unable to rename deck', { id: id + '-toast' })
      return utils.invalidateQueries(['deck.getAll'])
    },
    onSuccess({ id }) {
      toast.success('Deck renamed successfully', { id: id + '-toast' })
      return utils.invalidateQueries(['deck.getAll'])
    },
  })

  const { mutate: deleteDeck } = useOptimisticUpdate({
    mutationKey: 'deck.delete',
    invalidatedQueryKey: ['deck.getAll'],
    updateQueryData: (
      prevData: inferQueryOutput<'deck.getAll'>,
      input: inferMutationInput<'deck.delete'>
    ) => prevData.filter((deck) => deck.id !== input.deckId),
  })

  const ctaClassName = useMemo(
    () =>
      twMerge(
        'btn btn-primary gap-2',
        clsx({
          loading: isCreating,
          'motion-safe:animate-wiggle': decks?.length === 0,
        })
      ),
    [isCreating, decks?.length]
  )

  return (
    <>
      <Head>
        <title>Vel &#x2022; Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className={ctaClassName} onClick={() => createDeck()}>
          {!isCreating && <MdPostAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Create deck</span>
        </button>
      </Toolbar>

      <p className='prose max-w-full'>
        Click{' '}
        <kbd className='kbd mx-1'>
          <MdPostAdd className='mr-2 h-4 w-4' /> Create Deck
        </kbd>{' '}
        to add a new set of flashcards. <br />
        Edit your decks or simply start studying through your cards.
      </p>

      {queryLoading ? (
        <Spinner />
      ) : decks?.length === 0 ? (
        <EmptyFigure caption='This place is a desert. Create a deck!' />
      ) : (
        <section className='auto-fill grid gap-4 py-4'>
          {decks?.map((deck) => (
            <DeckCard
              key={deck.id}
              title={deck.title}
              amount={deck.cards.length}
              createdAt={deck.createdAt}
              updatedAt={deck.updatedAt}
              deckId={deck.id}
              onRename={(renamedDeckId, newTitle) =>
                renameDeck({ deckId: renamedDeckId, title: newTitle })
              }
              onDelete={(deletedDeckId) =>
                deleteDeck({ deckId: deletedDeckId })
              }
              onPreview={() => router.push(`/preview/${deck.id}`)}
              onStudy={() => console.log('study')}
              onEdit={() => router.push(`/edit/${deck.id}`)}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default Decks
