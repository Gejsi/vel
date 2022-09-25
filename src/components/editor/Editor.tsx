import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import {
  createBasicMarksPlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break'
import { createCodeBlockPlugin } from '@udecode/plate-code-block'
import {
  createPlugins,
  Plate,
  type TEditableProps,
  type Value,
} from '@udecode/plate-core'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createListPlugin } from '@udecode/plate-list'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'
import { useCallback, useState, type MouseEventHandler } from 'react'
import { MdDelete } from 'react-icons/md'
import {
  autoformatOptions,
  exitBreakOptions,
  resetNodeOptions,
  softBreakOptions,
  trailingBlockOptions,
} from '../../utils/options.editor'
import {
  Blockquote,
  BoldItem,
  CodeBlock,
  CodeLine,
  Heading1,
  InlineCodeItem,
  ItalicItem,
  ListItem,
  OrderedList,
  Paragraph,
  StrikethroughItem,
  UnderlineItem,
  UnorderedList,
} from './Nodes'

const plugins = createPlugins(
  [
    createHeadingPlugin(),
    createParagraphPlugin(),
    createCodeBlockPlugin(),
    createBlockquotePlugin(),
    createBasicMarksPlugin(),
    createListPlugin(),
    createAutoformatPlugin(autoformatOptions),
    createResetNodePlugin(resetNodeOptions),
    createExitBreakPlugin(exitBreakOptions),
    createTrailingBlockPlugin(trailingBlockOptions),
    createSoftBreakPlugin(softBreakOptions),
  ],
  {
    components: {
      h1: Heading1,
      p: Paragraph,
      blockquote: Blockquote,
      code_block: CodeBlock,
      code_line: CodeLine,
      ul: UnorderedList,
      ol: OrderedList,
      li: ListItem,
      [MARK_BOLD]: BoldItem,
      [MARK_ITALIC]: ItalicItem,
      [MARK_UNDERLINE]: UnderlineItem,
      [MARK_STRIKETHROUGH]: StrikethroughItem,
      [MARK_CODE]: InlineCodeItem,
    },
  }
)

const questionEditorProps: TEditableProps = {
  className: 'selection:bg-primary/40',
  spellCheck: false,
  autoFocus: true,
}

const answerEditorProps: TEditableProps = {
  className: 'selection:bg-secondary/40 bg-base-200 rounded-xl order-1',
  spellCheck: false,
  autoFocus: true,
}

type EditorProps = {
  /**
   *  Autoincremented client-side index (i.d. `map`'s second argument)
   */
  count: number
  /**
   * Initial value set for the question editor
   */
  initialQuestion: Value
  /**
   * Initial value set for the answer editor
   */
  initialAnswer: Value
  /**
   * Event handler that returns changes from both editors
   */
  onChange?: ((questionValue: Value, answerValue: Value) => void) | null
  /**
   * Event that occurs when the `trash` icon is clicked
   */
  onDelete: MouseEventHandler<HTMLButtonElement>
}

const Editor = ({
  count,
  initialQuestion,
  initialAnswer,
  onChange,
  onDelete,
}: EditorProps) => {
  const [question, setQuestion] = useState<Value>(initialQuestion)
  const [answer, setAnswer] = useState<Value>(initialAnswer)

  const handleQuestion = useCallback(
    (value: Value) => {
      if (value !== question) {
        onChange?.(value, answer)
        setQuestion(value)
      }
    },
    [question, answer, onChange]
  )

  const handleAnswer = useCallback(
    (value: Value) => {
      if (value !== answer) {
        onChange?.(question, value)
        setAnswer(value)
      }
    },
    [question, answer, onChange]
  )

  return (
    <div className='animate-[fadeIn_400ms_ease-out_forwards]'>
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
        <Plate
          id={`ae-${count}`}
          editableProps={answerEditorProps}
          plugins={plugins}
          onChange={handleAnswer}
          initialValue={answer}
        />
        <Plate
          id={`qe-${count}`}
          editableProps={questionEditorProps}
          plugins={plugins}
          onChange={handleQuestion}
          initialValue={question}
        />
      </div>
    </div>
  )
}

export default Editor
