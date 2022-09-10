import dayjs from 'dayjs'
import type { MouseEventHandler } from 'react'
import { MdDelete, MdDeviceHub, MdEdit } from 'react-icons/md'

type CardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  onDelete: MouseEventHandler<HTMLButtonElement>
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
      <div className='flex gap-2'>
        <h2 className='card-title flex-1'>{title}</h2>
        <button className='btn-icon' onClick={onDelete}>
          <MdDelete className='h-6 w-6' />
        </button>
      </div>
      <div className='stats stats-horizontal shadow md:stats-vertical'>
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
            {dayjs(updatedAt).format('ddd, MMM YYYY')}
          </div>
        </div>
      </div>

      <div className='card-actions mt-2 justify-center'>
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
