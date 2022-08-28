import dayjs from 'dayjs'
import type { MouseEventHandler } from 'react'
import { MdDelete, MdDeviceHub, MdEdit } from 'react-icons/md'

type CardProps = {
  title: string
  amount: number
  createdAt: Date
  updatedAt: Date
  onStudyClick: MouseEventHandler<HTMLButtonElement>
  onEditClick: MouseEventHandler<HTMLButtonElement>
}

const Card = ({
  title,
  amount,
  createdAt,
  updatedAt,
  onStudyClick,
  onEditClick,
}: CardProps) => (
  <div className='card bg-base-200'>
    <div className='card-body'>
      <div className='flex gap-2'>
        <h2 className='card-title flex-1'>{title}</h2>
        <button className='btn btn-ghost w-12 px-2'>
          <MdDelete className='h-6 w-6' />
        </button>
      </div>
      <div className='my-4 flex items-start justify-evenly gap-4 overflow-y-auto rounded-2xl bg-base-100 p-4'>
        <div>
          <h3 className='text-sm opacity-70'>Cards</h3>
          <p>{amount}</p>
        </div>
        <div>
          <h3 className='text-sm opacity-70'>Created</h3>
          <p>{dayjs(createdAt).format('DD/MM/YY')}</p>
        </div>
        <div>
          <h3 className='text-sm opacity-70'>Edited</h3>
          <p>{dayjs(updatedAt).format('ddd, MMM YYYY')}</p>
        </div>
      </div>

      <div className='card-actions mt-2 justify-center'>
        <div className='btn-group' role='group'>
          <button className='btn' onClick={onStudyClick}>
            <MdDeviceHub className='mr-1 h-6 w-6' />
            Study
          </button>
          <div className='w-1 bg-base-content/30' />
          <button className='btn' onClick={onEditClick}>
            <MdEdit className='mr-1 h-6 w-6' />
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Card
