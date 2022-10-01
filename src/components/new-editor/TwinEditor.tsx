import type { EditorOptions, JSONContent } from '@tiptap/react'
import { useCallback, useRef, type MouseEventHandler } from 'react'
import { MdDelete } from 'react-icons/md'
import SmallEditor from './SmallEditor'

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
}: EditorProps) => {
  const questionRef = useRef<JSONContent[] | undefined>(initialQuestion)
  const answerRef = useRef<JSONContent[] | undefined>(initialAnswer)

  const handleQuestion: EditorOptions['onUpdate'] = useCallback(
    (value) => {
      const content = value.editor.getJSON().content
      questionRef.current = content
      onChange(questionRef.current, answerRef.current)
    },
    [onChange]
  )

  const handleAnswer: EditorOptions['onUpdate'] = useCallback(
    (value) => {
      const content = value.editor.getJSON().content
      answerRef.current = content
      onChange(questionRef.current, answerRef.current)
    },
    [onChange]
  )

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
        <SmallEditor
          className='selection:bg-primary/40'
          placeholder='Write a question...'
          onUpdate={handleQuestion}
          initalContent={initialQuestion}
        />
        <SmallEditor
          className='rounded-xl bg-base-200 selection:bg-secondary/40'
          placeholder='Write an answer...'
          onUpdate={handleAnswer}
          initalContent={initialAnswer}
        />
      </div>
    </div>
  )
}

export default TwinEditor
