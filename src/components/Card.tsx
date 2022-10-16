import dayjs from 'dayjs'
import { atom, useAtom } from 'jotai'
import type { MouseEventHandler } from 'react'
import {
  MdDelete,
  MdDeviceHub,
  MdEdit,
  MdEditNote,
  MdMoreVert,
  MdShare,
} from 'react-icons/md'
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './Dialog'
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from './Dropdown'

type CardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  deckId: number
  onRename: (renamedDeckId: number) => void
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

      <Dialog
        open={dialog.deckId >= 0 && dialog.name === 'rename'}
        onOpenChange={() =>
          setDialog((prev) => ({
            deckId: prev.deckId >= 0 ? -1 : prev.deckId,
          }))
        }
      >
        <DialogContent>
          <DialogTitle>Rename this deck</DialogTitle>
          <div>Testing</div>

          <div className='modal-action'>
            <DialogAction asChild>
              <button className='btn btn-ghost'>Cancel</button>
            </DialogAction>
            <DialogAction asChild>
              <button
                className='btn btn-primary'
                onClick={() => onRename(dialog.deckId)}
              >
                Save
              </button>
            </DialogAction>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog.deckId >= 0 && dialog.name === 'delete'}
        onOpenChange={() =>
          setDialog((prev) => ({
            deckId: prev.deckId >= 0 ? -1 : prev.deckId,
          }))
        }
      >
        <DialogContent>
          <DialogTitle>Delete this deck</DialogTitle>
          <DialogDescription>
            The deck cannot be restored after the removal.
          </DialogDescription>

          <div className='modal-action'>
            <DialogAction asChild>
              <button className='btn btn-ghost'>Cancel</button>
            </DialogAction>
            <DialogAction asChild>
              <button
                className='btn btn-error'
                onClick={() => onDelete(dialog.deckId)}
              >
                Delete
              </button>
            </DialogAction>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Card
