import { MdDeviceHub, MdEdit, MdMoreVert } from 'react-icons/md'

const Card = ({ title }: { title: string }) => (
  <div className='card bg-base-200'>
    <div className='card-body'>
      <div className='flex gap-2'>
        <h2 className='card-title flex-1'>{title}</h2>
        <button className='btn btn-ghost px-2'>
          <MdMoreVert className='h-6 w-6' />
        </button>
      </div>
      <div className='my-4 flex items-start justify-evenly gap-4 overflow-y-auto rounded-2xl bg-base-100 p-4'>
        <div>
          <h3 className='text-sm opacity-70'>Cards</h3>
          <p>34</p>
        </div>
        <div>
          <h3 className='text-sm opacity-70'>Created</h3>
          <p>12/01/22</p>
        </div>
        <div>
          <h3 className='text-sm opacity-70'>Edited</h3>
          <p>200 days ago</p>
        </div>
      </div>

      <div className='card-actions mt-2 justify-center'>
        <div className='btn-group' role='group'>
          <button className='btn'>
            <MdDeviceHub className='mr-1 h-6 w-6' />
            Study
          </button>
          <div className='w-1 bg-base-content/30' />
          <button className='btn'>
            <MdEdit className='mr-1 h-6 w-6' />
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Card
