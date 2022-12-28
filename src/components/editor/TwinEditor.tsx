import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { EditorOptions, JSONContent } from '@tiptap/react'
import { MouseEventHandler, useCallback, useRef } from 'react'
import { MdDelete } from 'react-icons/md'
import { SplitCard, type SplitCardProps } from '../SplitCard'
import SmallEditor from './SmallEditor'

type EditorProps = SplitCardProps & {
  /**
   * Event handler that returns changes from both editors
   */
  onChange: (questionValue?: JSONContent[], answerValue?: JSONContent[]) => void
  /**
   * Event that occurs when the `trash` icon is clicked
   */
  onDelete: MouseEventHandler<HTMLButtonElement>
}

const IconButton = ({ onDelete }: { onDelete: EditorProps['onDelete'] }) => (
  <div className='tooltip' data-tip='Delete card'>
    <button className='btn-icon' onClick={onDelete}>
      <MdDelete className='h-5 w-5' />
    </button>
  </div>
)

const TwinEditor = ({
  count,
  initialQuestion,
  initialAnswer,
  onChange,
  onDelete,
}: EditorProps) => {
  const questionRef = useRef<JSONContent[] | undefined>(initialQuestion)
  const answerRef = useRef<JSONContent[] | undefined>(initialAnswer)

  const handleUpdate: (
    editorProps: Parameters<EditorOptions['onUpdate']>[0],
    updatingQuestionEditor: boolean
  ) => void = useCallback(
    (editorProps, updatingQuestionEditor) => {
      const { content } = editorProps.editor.getJSON()

      if (updatingQuestionEditor) questionRef.current = content
      else answerRef.current = content

      onChange(questionRef.current, answerRef.current)
    },
    [onChange]
  )

  return (
    <SplitCard count={count} iconButton={<IconButton onDelete={onDelete} />}>
      <SmallEditor
        className='selection:bg-primary/40'
        placeholder='Write a question...'
        initialContent={questionRef.current}
        onUpdate={(editorProps) => handleUpdate(editorProps, true)}
      />
      <SmallEditor
        className='rounded-xl bg-base-200 selection:bg-secondary/40'
        placeholder='Write an answer...'
        initialContent={answerRef.current}
        onUpdate={(editorProps) => handleUpdate(editorProps, false)}
      />
    </SplitCard>
  )
}

export default TwinEditor
