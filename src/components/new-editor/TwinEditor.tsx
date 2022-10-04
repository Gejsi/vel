import type { JSONContent } from '@tiptap/react'
import { Atom, atom, Provider as AtomProvider } from 'jotai'
import type { MouseEventHandler } from 'react'
import { MdDelete } from 'react-icons/md'
import SmallEditor from './SmallEditor'

export const questionAtom = atom<JSONContent[] | undefined>(undefined)
export const answerAtom = atom<JSONContent[] | undefined>(undefined)

type EditorProps = {
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
  /**
   * Event handler that returns changes from both editors
   */
  onChange: (questionValue?: JSONContent[], answerValue?: JSONContent[]) => void
  /**
   * Event that occurs when the `trash` icon is clicked
   */
  onDelete: MouseEventHandler<HTMLButtonElement>
}

const TwinEditor = ({
  count,
  initialQuestion,
  initialAnswer,
  onChange,
  onDelete,
}: EditorProps) => (
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
      <AtomProvider
        initialValues={
          [
            [questionAtom, initialQuestion],
            [answerAtom, initialAnswer],
          ] as Iterable<
            readonly [Atom<typeof initialQuestion>, typeof initialQuestion]
          >
        }
      >
        <SmallEditor
          className='selection:bg-primary/40'
          placeholder='Write a question...'
          isQuestionEditor={true}
          onChange={onChange}
        />
        <SmallEditor
          className='rounded-xl bg-base-200 selection:bg-secondary/40'
          placeholder='Write an answer...'
          isQuestionEditor={false}
          onChange={onChange}
        />
      </AtomProvider>
    </div>
  </div>
)

export default TwinEditor
