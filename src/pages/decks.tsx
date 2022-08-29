import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import Toolbar from '../components/Toolbar'
import { useContext, useMutation, useQuery } from '../utils/trpc'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  const router = useRouter()
  const utils = useContext()

  const { data: decks, isLoading: queryLoading } = useQuery(['deck.getAll'])

  const { mutate: createDeck, isLoading: isCreating } = useMutation(
    'deck.create',
    {
      async onSuccess({ id }) {
        // there is no need to `await` for the query to refetch
        // because the user is sent to the editor, but it should
        // still be invalidated in case the user goes back to this page
        utils.invalidateQueries(['deck.getAll'])

        await router.push(`/editor/${id}`)
      },
    }
  )

  const { mutate: deleteDeck, isLoading: isDeleting } = useMutation(
    'deck.delete',
    {
      async onMutate(deletedDeck) {
        // cancel any outgoing refetches (so they don't overwrite the optimistic update)
        await utils.cancelQuery(['deck.getAll'])
        // save the previous value
        const prevData = utils.getQueryData(['deck.getAll'])
        // optimistically remove a deck by filtering old decks
        utils.setQueryData(['deck.getAll'], (oldDecks) =>
          oldDecks!.filter((deck) => deck.id !== deletedDeck.id)
        )
        // return a context object with the snapshotted value `prevData`
        return { prevData }
      },
      // if the mutation fails, use the context to roll back
      onError(err, deletedDeck, context) {
        utils.setQueryData(['deck.getAll'], context?.prevData!)
      },
      // refetch after error or success:
      onSettled() {
        utils.invalidateQueries(['deck.getAll'])
      },
    }
  )

  const btnClass = twMerge(
    'btn btn-primary gap-2',
    clsx({ loading: isCreating })
  )

  return (
    <>
      <Head>
        <title>Vel | Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className={btnClass} onClick={() => createDeck()}>
          {!isCreating && <MdAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Create deck</span>
        </button>
      </Toolbar>

      <p className='prose'>
        Click &nbsp;<kbd className='kbd'>+ Create Deck</kbd> to add a new set of
        flashcards. <br />
        Edit your decks or simply start studying through your cards.
      </p>

      {queryLoading ? (
        <Spinner />
      ) : (
        <section className='grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4 py-4'>
          {decks?.map((deck) => (
            <Card
              key={deck.id}
              title={deck.title}
              amount={deck.cards.length}
              createdAt={deck.createdAt}
              updatedAt={deck.updatedAt}
              onDelete={() => deleteDeck({ id: deck.id })}
              onStudy={() => console.log('study')}
              onEdit={() => router.push(`/editor/${deck.id}`)}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default Decks
