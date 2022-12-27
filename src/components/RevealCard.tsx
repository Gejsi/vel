import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import SmallEditor from './editor/SmallEditor'
import { CardProps } from './editor/TwinEditor'

type RevealCardProps = CardProps & {
  defaultOpen: boolean
}

const RevealCard = ({
  count,
  initialQuestion,
  initialAnswer,
  defaultOpen,
}: RevealCardProps) => {
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
          <h2 className='pl-4 text-sm font-bold uppercase'>
            Card &#x2022; {count}
          </h2>
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
        <SmallEditor
          className='selection:bg-primary/40'
          placeholder='This question is empty...'
          initialContent={initialQuestion}
          editable={false}
          onUpdate={() => null}
        />
        {open && (
          <SmallEditor
            className='rounded-xl bg-base-200 selection:bg-secondary/40'
            placeholder='This answer is empty...'
            initialContent={initialAnswer}
            editable={false}
            onUpdate={() => null}
          />
        )}
      </div>
    </div>
  )
}

export default RevealCard
