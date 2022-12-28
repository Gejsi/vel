import dayjs from 'dayjs'
import { atom, useAtom } from 'jotai'
import type { MouseEventHandler, FormEventHandler } from 'react'
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from '../components/Modal'
import {
  MdDelete,
  MdDeviceHub,
  MdEdit,
  MdEditNote,
  MdMoreVert,
  MdShare,
  MdVisibility,
} from 'react-icons/md'
import {
  deckTitleSchema,
  MAX_DECK_TITLE_LENGTH,
  MIN_DECK_TITLE_LENGTH,
} from '../schemas/deck-title.schema'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from './Dropdown'
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

const dialogAtom = atom<{
  deckId?: string
  name?: 'rename' | 'delete'
}>({
  deckId: undefined,
  name: undefined,
})

const renameAtom = atom({
  newTitle: '',
  isWrong: false,
})

type DeckCardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  deckId: string
  onRename: (renamedDeckId: string, newTitle: string) => void
  onDelete: (deletedDeckId: string) => void
  onPreview: MouseEventHandler<HTMLDivElement>
  onStudy: MouseEventHandler<HTMLButtonElement>
  onEdit: MouseEventHandler<HTMLButtonElement>
}

const DeckCard = ({
  title,
  amount,
  createdAt,
  updatedAt,
  deckId,
  onRename,
  onDelete,
  onPreview,
  onStudy,
  onEdit,
}: DeckCardProps) => {
  const [dialog, setDialog] = useAtom(dialogAtom)
  const [renameValue, setRenameValue] = useAtom(renameAtom)

  const handleRename: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const title = renameValue.newTitle.trim()

    if (!deckTitleSchema.safeParse(title).success) {
      setRenameValue({ newTitle: '', isWrong: true })
      return
    }

    dialog.deckId && onRename(dialog.deckId, renameValue.newTitle)
    setDialog(() => ({ deckId: undefined })) // close dialog after submitting
    setRenameValue({ newTitle: '', isWrong: false })
  }

  return (
    <>
      <div className='card bg-base-200/90 shadow'>
        <div className='card-body'>
          <div className='flex items-center gap-2'>
            <h2 className='card-title block flex-1 truncate' title={title}>
              {title}
            </h2>
            <Dropdown>
              <DropdownTrigger>
                <button className='btn-icon'>
                  <MdMoreVert className='h-5 w-5' />
                </button>
              </DropdownTrigger>

              <DropdownContent>
                <DropdownItem
                  onClick={() => setDialog({ deckId, name: 'rename' })}
                >
                  <MdEditNote className='h-5 w-5' />
                  Rename
                </DropdownItem>
                <DropdownItem
                  onClick={() => setDialog({ deckId, name: 'delete' })}
                >
                  <MdDelete className='h-5 w-5' />
                  Delete
                </DropdownItem>
                <DropdownItem onClick={onPreview}>
                  <MdVisibility className='h-5 w-5' />
                  Preview
                </DropdownItem>
                <DropdownItem>
                  <MdShare className='h-5 w-5' />
                  Share
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
          <div className='stats my-4 shadow'>
            <div className='stat py-3 px-5'>
              <div className='stat-desc'>Cards</div>
              <div className='stat-title opacity-100'>{amount}</div>
            </div>
            <div className='stat py-3 px-5'>
              <div className='stat-desc'>Created</div>
              <div className='stat-title opacity-100'>
                {dayjs(createdAt).format('DD/MM/YY')}
              </div>
            </div>
            <div className='stat py-3 px-5'>
              <div className='stat-desc'>Edited</div>
              <div className='stat-title opacity-100'>
                {dayjs(updatedAt).format('dddd, MMM')} &#x2022;{' '}
                {dayjs(updatedAt).format('hh:mm a')}
              </div>
            </div>
          </div>

          <div className='card-actions justify-center'>
            <div className='btn-group' role='group'>
              <button className='btn' onClick={onStudy}>
                <MdDeviceHub className='mr-1 h-6 w-6' />
                Study
              </button>
              <div className='w-1 bg-base-content/30' />
              <button className='btn' onClick={onEdit}>
                <MdEdit className='mr-1 h-6 w-6' />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={dialog.deckId !== undefined && dialog.name === 'rename'}
        onOpenChange={() => {
          setDialog({ deckId: undefined })
          setRenameValue({ newTitle: '', isWrong: false })
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
                  clsx({ 'input-error': renameValue.isWrong })
                )}
                value={renameValue.newTitle}
                minLength={MIN_DECK_TITLE_LENGTH}
                maxLength={MAX_DECK_TITLE_LENGTH}
                onChange={(e) =>
                  setRenameValue({
                    newTitle: e.target.value,
                    isWrong:
                      e.target.value.length < MIN_DECK_TITLE_LENGTH ||
                      e.target.value.length > MAX_DECK_TITLE_LENGTH,
                  })
                }
              />

              <label className='label'>
                <span className='label-text-alt text-error'>
                  {renameValue.isWrong &&
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
                onClick={() => dialog.deckId && onDelete(dialog.deckId)}
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

export default DeckCard
