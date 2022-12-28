import { type MouseEventHandler, useEffect, useState } from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import ReadonlyEditor from './editor/ReadonlyEditor'
import { SplitCard, SplitCardProps } from './SplitCard'

const IconButton = ({
  open,
  onClick,
}: {
  open: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className='tooltip' data-tip={!open ? 'Show answer' : 'Hide answer'}>
    <button className='btn-icon' onClick={onClick}>
      {!open ? (
        <MdVisibility className='h-5 w-5' />
      ) : (
        <MdVisibilityOff className='h-5 w-5' />
      )}
    </button>
  </div>
)

const RevealCard = ({
  count,
  initialQuestion,
  initialAnswer,
  defaultOpen,
}: SplitCardProps & {
  defaultOpen: boolean
}) => {
  const [open, setOpen] = useState(defaultOpen)

  // sync states between component and parent,
  // this is done to properly support the `hide/show all answers` feature
  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  return (
    <SplitCard
      count={count}
      iconButton={
        <IconButton open={open} onClick={() => setOpen((prev) => !prev)} />
      }
    >
      <ReadonlyEditor
        className='selection:bg-primary/40'
        placeholder='No question has been provided...'
        initialContent={initialQuestion}
      />
      {open && (
        <ReadonlyEditor
          className='rounded-xl bg-base-200 selection:bg-secondary/40'
          placeholder='No answer has been provided...'
          initialContent={initialAnswer}
        />
      )}
    </SplitCard>
  )
}

export default RevealCard
