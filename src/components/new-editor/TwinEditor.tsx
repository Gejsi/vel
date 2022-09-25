import { MdDelete } from 'react-icons/md'
import Editor from './Editor'

const TwinEditor = ({
  count,
  initialQuestion,
  initialAnswer,
  onChange,
  onDelete,
}: any) => {
  return (
    <div>
      <div className='mt-6 flex items-center justify-center'>
        <div className='flex items-center gap-4 rounded-t-xl bg-base-300/80 px-2 py-1'>
          <h2 className='pl-4 text-sm font-bold uppercase'>
            Card &#x2022; {count}
          </h2>
          <div className='tooltip' data-tip='Delete card'>
            <button className='btn-icon' onClick={onDelete}>
              <MdDelete className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>
      <div className='grid min-w-fit grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] rounded-xl bg-base-300 shadow-lg'>
        <Editor className='selection:bg-primary/40' />
        <Editor className='rounded-xl bg-base-200 selection:bg-secondary/40' />
      </div>
    </div>
  )
}

export default TwinEditor
