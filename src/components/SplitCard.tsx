import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { JSONContent } from '@tiptap/react'
import type { ReactNode } from 'react'

export type SplitCardProps = {
  /**
   *  Autoincremented client-side index (i.d. `map`'s second argument)
   */
  count: number
  /**
   * Initial value set for the question editor
   */
  initialQuestion?: JSONContent[]
  /**
   * Initial value set for the answer editor
   */
  initialAnswer?: JSONContent[]
}

export const SplitCard = ({
  count,
  iconButton,
  children,
}: {
  count: SplitCardProps['count']
  iconButton: JSX.Element
  children: ReactNode
}) => {
  const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>()

  return (
    <div className='min-w-fit animate-fadeIn'>
      <div className='mt-10 flex items-center justify-center'>
        <div className='flex items-center gap-4 rounded-t-xl bg-base-300/80 px-2 py-1'>
          <h2 className='pl-4 text-sm font-bold uppercase'>
            Card &#x2022; {count}
          </h2>
          {iconButton}
        </div>
      </div>
      <div
        ref={autoAnimateRef}
        className='auto-fit grid min-w-fit rounded-xl bg-base-300 shadow-lg'
      >
        {children}
      </div>
    </div>
  )
}
