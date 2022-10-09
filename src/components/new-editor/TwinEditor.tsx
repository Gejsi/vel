import type { Editor } from '@tiptap/core'
import type { EditorOptions, JSONContent } from '@tiptap/react'
import { Atom, atom, Provider as AtomProvider, useAtom } from 'jotai'
import { MouseEventHandler, useCallback } from 'react'
import { MdDelete } from 'react-icons/md'
import SmallEditor from './SmallEditor'

export const editorAtom = atom<Editor | null>(null)
// This atom is used to re-render forcefully icon buttons in the toolbar
export const toolbarForcedAtom = atom(0)

export const questionAtom = atom<JSONContent[] | undefined>(undefined)
export const answerAtom = atom<JSONContent[] | undefined>(undefined)

type InitialValues<T> = Iterable<readonly [Atom<T>, T]>

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
  const [, setEditor] = useAtom(editorAtom)
  const [, forceUpdate] = useAtom(toolbarForcedAtom)

  const handleTransaction = useCallback<EditorOptions['onTransaction']>(
    (editorProps) => {
      setEditor(editorProps.editor)
      forceUpdate((prev) => prev + 1)
    },
    [setEditor, forceUpdate]
  )

  return (
    <div className='animate-fadeIn'>
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
            ] as InitialValues<typeof initialQuestion>
          }
        >
          <SmallEditor
            className='selection:bg-primary/40'
            placeholder='Write a question...'
            isQuestionEditor={true}
            onChange={onChange}
            onTransaction={handleTransaction}
          />
          <SmallEditor
            className='rounded-xl bg-base-200 selection:bg-secondary/40'
            placeholder='Write an answer...'
            isQuestionEditor={false}
            onChange={onChange}
            onTransaction={handleTransaction}
          />
        </AtomProvider>
      </div>
    </div>
  )
}

export default TwinEditor
