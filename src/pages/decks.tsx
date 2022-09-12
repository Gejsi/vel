import {
  Close,
  Content,
  Description,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import Toolbar from '../components/Toolbar'
import { useContext, useMutation, useQuery } from '../utils/trpc'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  const [deckId, setDeckId] = useState(-1)
  const router = useRouter()
  const utils = useContext()

  const { data: decks, isLoading: queryLoading } = useQuery(['deck.getAll'])

  const { mutate: createDeck, isLoading: isCreating } = useMutation(
    'deck.create',
    {
      async onSuccess({ id }) {
        await utils.invalidateQueries(['deck.getAll'])
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
      // refetch after error or success
      onSettled() {
        utils.invalidateQueries(['deck.getAll'])
      },
    }
  )

  const btnClass = useMemo(
    () => twMerge('btn btn-primary gap-2', clsx({ loading: isCreating })),
    [isCreating]
  )

  return (
    <>
      <Head>
        <title>Vel &#x2022; Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className={btnClass} onClick={() => createDeck()}>
          {!isCreating && <MdPostAdd className='h-6 w-6' />}
          <span className='hidden md:block'>Create deck</span>
        </button>
      </Toolbar>

      <p className='prose max-w-full'>
        Click <kbd className='kbd mx-1'>+ Create Deck</kbd> to add a new set of
        flashcards. <br />
        Edit your decks or simply start studying through your cards.
      </p>

      {queryLoading ? (
        <Spinner />
      ) : (
        <section className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 py-4'>
          {decks?.map((deck) => (
            <Card
              key={deck.id}
              title={deck.title}
              amount={deck.cards.length}
              createdAt={deck.createdAt}
              updatedAt={deck.updatedAt}
              onDelete={() => setDeckId((prev) => (prev = deck.id))}
              onStudy={() => console.log('study')}
              onEdit={() => router.push(`/editor/${deck.id}`)}
            />
          ))}
        </section>
      )}

      {/* Modal for deleting a deck, it will probably be refactored into a component in the future */}
      <Root
        open={deckId >= 0 ? true : false}
        onOpenChange={() =>
          setDeckId((prev) => (prev >= 0 ? (prev = -1) : prev))
        }
      >
        <Portal>
          <div className='modal modal-open modal-bottom animate-fadeIn md:modal-middle'>
            <Content className='modal-box z-[101] animate-fadeUp'>
              <Title className='text-2xl'>Delete this deck</Title>
              <Description>
                The deck cannot be restored after the removal.
              </Description>
              <div className='modal-action'>
                <Close asChild>
                  <button className='btn btn-ghost'>Cancel</button>
                </Close>
                <Close asChild>
                  <button
                    className='btn btn-error'
                    onClick={() => deleteDeck({ id: deckId })}
                  >
                    Delete Deck
                  </button>
                </Close>
              </div>
            </Content>
          </div>
        </Portal>
      </Root>
    </>
  )
}

export default Decks
