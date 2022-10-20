import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { MdPostAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Card from '../components/Card'
import EmptyFigure from '../components/EmptyFigure'
import Spinner from '../components/Spinner'
import Toolbar from '../components/Toolbar'
import { useContext, useMutation, useQuery } from '../utils/trpc'
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
    onMutate({ id }) {
      toast.loading('Renaming deck', { id: id + '-toast' })
    },
    async onError(err, { id }) {
      await utils.invalidateQueries(['deck.getAll'])
      toast.error('Unable to rename deck', { id: id + '-toast' })
    },
    async onSuccess({ id }) {
      await utils.invalidateQueries(['deck.getAll'])
      toast.success('Deck renamed successfully', { id: id + '-toast' })
    },
  })

  const { mutate: deleteDeck } = useMutation('deck.delete', {
    async onMutate(deletedDeck) {
      // cancel any outgoing refetches (so they don't overwrite the optimistic update)
      await utils.cancelQuery(['deck.getAll'])
      // save the previous value
      const prevData = utils.getQueryData(['deck.getAll'])
      // optimistically remove a deck by filtering old decks
      utils.setQueryData(['deck.getAll'], (oldDecks) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        oldDecks!.filter((deck) => deck.id !== deletedDeck.id)
      )

      // return a context object with the snapshotted value `prevData`
      return { prevData }
    },
    // if the mutation fails, use the context to roll back
    onError(err, deletedDeck, context) {
      if (context?.prevData)
        utils.setQueryData(['deck.getAll'], context.prevData)
    },
    // refetch after error or success
    onSettled() {
      utils.invalidateQueries(['deck.getAll'])
    },
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

      <div className='px-4 lg:px-8'>
        <p className='prose max-w-full'>
          Click <kbd className='kbd mx-1'>+ Create Deck</kbd> to add a new set
          of flashcards. <br />
          Edit your decks or simply start studying through your cards.
        </p>

        {queryLoading ? (
          <Spinner />
        ) : decks?.length === 0 ? (
          <EmptyFigure caption='This place is a desert. Create a deck!' />
        ) : (
          <section className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 py-4'>
            {decks?.map((deck) => (
              <Card
                key={deck.id}
                title={deck.title}
                amount={deck.cards.length}
                createdAt={deck.createdAt}
                updatedAt={deck.updatedAt}
                deckId={deck.id}
                onRename={(renamedDeckId, newTitle) =>
                  renameDeck({ id: renamedDeckId, title: newTitle })
                }
                onDelete={(deletedDeckId) => deleteDeck({ id: deletedDeckId })}
                onStudy={() => console.log('study')}
                onEdit={() => router.push(`/edit/${deck.id}`)}
              />
            ))}
          </section>
        )}
      </div>
    </>
  )
}

export default Decks
