import { clsx } from 'clsx'
import { atom, useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEventHandler, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { MdPostAdd } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import Card from '../components/Card'
import EmptyFigure from '../components/EmptyFigure'
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from '../components/Modal'
import Spinner from '../components/Spinner'
import Toolbar from '../components/Toolbar'
import useOptimisticUpdate from '../hooks/use-optimistic-update'
import {
  MAX_DECK_TITLE_LENGTH,
  MIN_DECK_TITLE_LENGTH,
  titleSchema,
} from '../schemas/deck-title.schema'
import {
  useContext,
  useMutation,
  useQuery,
  type inferMutationInput,
  type inferQueryOutput,
} from '../utils/trpc'
import type { NextPageWithLayout } from './_app'

const dialogAtom = atom<{
  deckId?: string
  name?: 'rename' | 'delete'
}>({
  deckId: undefined,
  name: undefined,
})

const renameAtom = atom({
  newTitle: '',
  isError: false,
})

const Decks: NextPageWithLayout = () => {
  const [dialog, setDialog] = useAtom(dialogAtom)
  const [renameValue, setRenameValue] = useAtom(renameAtom)

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
    onError(err, { id }) {
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
    ) => prevData.filter((deck) => deck.id !== input.id),
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

  const handleRename: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const title = renameValue.newTitle.trim()

    if (!titleSchema.safeParse(title).success) {
      setRenameValue({ newTitle: '', isError: true })
      return
    }

    dialog.deckId && renameDeck({ id: dialog.deckId, title })
    setDialog(() => ({ deckId: undefined })) // close dialog after submitting
    setRenameValue({ newTitle: '', isError: false })
  }

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
          <section className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 py-4'>
            {decks?.map((deck) => (
              <Card
                key={deck.id}
                title={deck.title}
                amount={deck.cards.length}
                createdAt={deck.createdAt}
                updatedAt={deck.updatedAt}
                onRename={() => setDialog({ deckId: deck.id, name: 'rename' })}
                onDelete={() => setDialog({ deckId: deck.id, name: 'delete' })}
                onStudy={() => console.log('study')}
                onEdit={() => router.push(`/edit/${deck.id}`)}
              />
            ))}
          </section>
        )}
      </div>

      <Modal
        open={dialog.deckId !== undefined && dialog.name === 'rename'}
        onOpenChange={() => {
          setDialog({ deckId: undefined })
          setRenameValue({ newTitle: '', isError: false })
        }}
      >
        <ModalContent>
          <ModalTitle>Rename deck</ModalTitle>
          <form onSubmit={handleRename}>
            <div className='form-control'>
              <input
                type='text'
                placeholder='New title...'
                className={twMerge(
                  'input input-bordered w-full placeholder:opacity-40',
                  clsx({ 'input-error': renameValue.isError })
                )}
                value={renameValue.newTitle}
                minLength={MIN_DECK_TITLE_LENGTH}
                maxLength={MAX_DECK_TITLE_LENGTH}
                onChange={(e) =>
                  setRenameValue({
                    newTitle: e.target.value,
                    isError:
                      e.target.value.length < MIN_DECK_TITLE_LENGTH ||
                      e.target.value.length > MAX_DECK_TITLE_LENGTH,
                  })
                }
              />

              <label className='label'>
                <span className='label-text-alt text-error'>
                  {renameValue.isError &&
                    `The new title must be between ${MIN_DECK_TITLE_LENGTH} and ${MAX_DECK_TITLE_LENGTH} characters`}
                </span>
                <span className='label-text-alt'>
                  {renameValue.newTitle.length} / {MAX_DECK_TITLE_LENGTH}
                </span>
              </label>
            </div>

            <div className='modal-action'>
              <ModalClose>
                <button className='btn btn-ghost'>Cancel</button>
              </ModalClose>
              <button className='btn btn-primary' type='submit'>
                Save
              </button>
            </div>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        open={dialog.deckId !== undefined && dialog.name === 'delete'}
        onOpenChange={() => setDialog({ deckId: undefined })}
      >
        <ModalContent>
          <ModalTitle>Delete deck</ModalTitle>
          <ModalDescription>
            The deck cannot be restored after the removal.
          </ModalDescription>

          <div className='modal-action'>
            <ModalClose>
              <button className='btn btn-ghost'>Cancel</button>
            </ModalClose>
            <ModalClose>
              <button
                className='btn btn-error'
                onClick={() =>
                  dialog.deckId && deleteDeck({ id: dialog.deckId })
                }
              >
                Delete
              </button>
            </ModalClose>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Decks
