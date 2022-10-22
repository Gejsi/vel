import dayjs from 'dayjs'
import { atom, useAtom } from 'jotai'
import { useState, type FormEventHandler, type MouseEventHandler } from 'react'
import {
  MdDelete,
  MdDeviceHub,
  MdEdit,
  MdEditNote,
  MdMoreVert,
  MdShare,
} from 'react-icons/md'
import { MAX_RENAME_TITLE, titleSchema } from '../schemas/deck-title.schema'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from './Dropdown'
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from './Modal'

type CardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  deckId: number
  onRename: (renamedDeckId: number, newTitle: string) => void
  onDelete: (deletedDeckId: number) => void
  onStudy: MouseEventHandler<HTMLButtonElement>
  onEdit: MouseEventHandler<HTMLButtonElement>
}

const dialogAtom = atom<{ deckId: number; name?: 'rename' | 'delete' }>({
  deckId: -1,
  name: undefined,
})

const Card = ({
  title,
  amount,
  createdAt,
  updatedAt,
  deckId,
  onRename,
  onDelete,
  onStudy,
  onEdit,
}: CardProps) => {
  const [dialog, setDialog] = useAtom(dialogAtom)
  const [newTitle, setNewTitle] = useState('')
  const [renameError, setRenameError] = useState(false)

  const handleRenameForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const title = newTitle.trim()
    const parsedTitle = titleSchema.safeParse(title)

    if (!parsedTitle.success) {
      setRenameError(true)
      return
    }

    onRename(dialog.deckId, title)
    setDialog(() => ({ deckId: -1 })) // close dialog after submitting
    setRenameError(false)
    setNewTitle('')
  }

  return (
    <>
      <div className='card bg-base-200/90 shadow'>
        <div className='card-body'>
          <div className='flex items-center gap-2'>
            <h2 className='card-title block flex-1 truncate'>{title}</h2>
            <Dropdown>
              <DropdownTrigger>
                <button className='btn-icon'>
                  <MdMoreVert className='h-6 w-6' />
                </button>
              </DropdownTrigger>

              <DropdownContent>
                <DropdownItem
                  onClick={() =>
                    setDialog(() => ({
                      deckId,
                      name: 'rename',
                    }))
                  }
                >
                  <MdEditNote className='h-6 w-6' />
                  Rename
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    setDialog(() => ({
                      deckId,
                      name: 'delete',
                    }))
                  }
                >
                  <MdDelete className='h-6 w-6' />
                  Delete
                </DropdownItem>
                <DropdownItem>
                  <MdShare className='h-6 w-6' />
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
        open={dialog.deckId >= 0 && dialog.name === 'rename'}
        onOpenChange={() => {
          setDialog((prev) => ({
            deckId: prev.deckId >= 0 ? -1 : prev.deckId,
          }))
          setRenameError(false)
          setNewTitle('')
        }}
      >
        <ModalContent>
          <ModalTitle>Rename deck</ModalTitle>
          <form onSubmit={handleRenameForm}>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Type here...'
                className='input input-bordered w-full out-of-range:input-error'
                value={newTitle}
                minLength={1}
                maxLength={MAX_RENAME_TITLE}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <label className='label'>
                <span className='label-text-alt text-error'>
                  {renameError &&
                    `The new title must be between 1 and ${MAX_RENAME_TITLE} characters`}
                </span>
                <span className='label-text-alt'>
                  {newTitle.length} / {MAX_RENAME_TITLE}
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
        open={dialog.deckId >= 0 && dialog.name === 'delete'}
        onOpenChange={() =>
          setDialog((prev) => ({
            deckId: prev.deckId >= 0 ? -1 : prev.deckId,
          }))
        }
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
                onClick={() => onDelete(dialog.deckId)}
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

export default Card
