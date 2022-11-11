import dayjs from 'dayjs'
import type { MouseEventHandler } from 'react'
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
  onRename: MouseEventHandler<HTMLDivElement>
  onDelete: MouseEventHandler<HTMLDivElement>
  onPreview: MouseEventHandler<HTMLDivElement>
  onStudy: MouseEventHandler<HTMLButtonElement>
  onEdit: MouseEventHandler<HTMLButtonElement>
}

const Card = ({
  title,
  amount,
  createdAt,
  updatedAt,
  onRename,
  onDelete,
  onPreview,
  onStudy,
  onEdit,
}: CardProps) => (
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
            <DropdownItem onClick={onRename}>
              <MdEditNote className='h-5 w-5' />
              Rename
            </DropdownItem>
            <DropdownItem onClick={onDelete}>
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
)

export default Card
