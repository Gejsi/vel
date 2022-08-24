import { MdDeviceHub, MdEdit } from 'react-icons/md'

const Card = ({ title }: { title: string }) => (
  <div className='card bg-primary/10'>
    <div className='card-body'>
      <h2 className='card-title'>{title}</h2>
      <p>Click the button to listen on Spotiwhy app.</p>
      <div className='card-actions justify-center'>
        <div className='btn-group'>
          <button className='btn btn-secondary'>
            <MdDeviceHub className='h-6 w-6' />
            &nbsp;Study
          </button>
          <button className='btn btn-outline'>
            <MdEdit className='h-6 w-6' />
            &nbsp;Edit
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default Card
