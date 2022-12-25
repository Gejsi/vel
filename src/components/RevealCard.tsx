import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const RevealCard = ({ defaultOpen }: { defaultOpen: boolean }) => {
  const [open, setOpen] = useState(defaultOpen)
  const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()

  // sync states between component and parent,
  // this is done to properly support the `hide/show all answers` feature
  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  // TODO: this card uses many of the same styles as `TwinEditor`:
  // it should be abstracted into another component
  return (
    <div className='min-w-fit animate-fadeIn md:mx-auto md:w-9/12 lg:w-1/2'>
      <div className='mt-10 flex items-center justify-center'>
        <div className='flex items-center gap-4 rounded-t-xl bg-base-300/80 px-2 py-1'>
          <h2 className='pl-4 text-sm font-bold uppercase'>Card &#x2022; 1</h2>
          <div
            className='tooltip'
            data-tip={!open ? 'Show answer' : 'Hide answer'}
          >
            <button
              className='btn-icon'
              onClick={() => setOpen((prev) => !prev)}
            >
              {!open ? (
                <MdVisibility className='h-5 w-5' />
              ) : (
                <MdVisibilityOff className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        ref={autoAnimateRef}
        className='grid min-w-fit grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] rounded-xl bg-base-300 shadow-lg'
      >
        <div className='prose h-full max-h-72 min-h-[6rem] max-w-none overflow-y-auto p-4 outline-none selection:bg-primary/40'>
          Left
        </div>
        {open && (
          <div className='prose h-full max-h-72 min-h-[6rem] max-w-none overflow-y-auto rounded-xl bg-base-200 p-4 outline-none selection:bg-secondary/40'>
            Right
          </div>
        )}
      </div>
    </div>
  )
}

export default RevealCard
