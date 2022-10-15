import {
  Arrow as DropdownArrow,
  Content as DropdownContent,
  Group as DropdownGroup,
  Item as DropdownItem,
  Portal as DropdownPortal,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from '@radix-ui/react-dropdown-menu'
import dayjs from 'dayjs'
import type { MouseEventHandler } from 'react'
import {
  MdDelete,
  MdDeviceHub,
  MdEdit,
  MdEditNote,
  MdMoreVert,
  MdShare,
} from 'react-icons/md'

type CardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  onDelete: MouseEventHandler<HTMLLIElement>
  onStudy: MouseEventHandler<HTMLButtonElement>
  onEdit: MouseEventHandler<HTMLButtonElement>
}

const Card = ({
  title,
  amount,
  createdAt,
  updatedAt,
  onDelete,
  onStudy,
  onEdit,
}: CardProps) => (
  <div className='card bg-base-200/90 shadow'>
    <div className='card-body'>
      <div className='flex items-center gap-2'>
        <h2 className='card-title block flex-1 truncate'>{title}</h2>
        <DropdownRoot>
          <DropdownTrigger asChild>
            <button className='btn-icon'>
              <MdMoreVert className='h-6 w-6' />
            </button>
          </DropdownTrigger>

          <DropdownPortal>
            <DropdownContent
              loop
              className='rounded-box border-2 border-base-content/40 bg-base-content/5 p-4 backdrop-blur-md'
            >
              <DropdownGroup asChild>
                <ul className='menu'>
                  <DropdownItem asChild>
                    <li className='dropdown-item'>
                      <span>
                        <MdEditNote className='h-6 w-6' />
                        Rename
                      </span>
                    </li>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <li className='dropdown-item' onClick={onDelete}>
                      <span>
                        <MdDelete className='h-6 w-6' />
                        Delete
                      </span>
                    </li>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <li className='dropdown-item'>
                      <span>
                        <MdShare className='h-6 w-6' />
                        Share
                      </span>
                    </li>
                  </DropdownItem>
                </ul>
              </DropdownGroup>
              <DropdownArrow className='m-[2px] fill-current text-base-content/40' />
            </DropdownContent>
          </DropdownPortal>
        </DropdownRoot>
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
)

export default Card
