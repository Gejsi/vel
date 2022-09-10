import { createAutoformatPlugin } from '@udecode/plate-autoformat'
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks'
import { createBlockquotePlugin } from '@udecode/plate-block-quote'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@udecode/plate-break'
import { createCodeBlockPlugin } from '@udecode/plate-code-block'
import { createPlugins, Plate, type TEditableProps } from '@udecode/plate-core'
import { createHeadingPlugin } from '@udecode/plate-heading'
import { createListPlugin } from '@udecode/plate-list'
import { createParagraphPlugin } from '@udecode/plate-paragraph'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'
import type { FC } from 'react'
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
  CodeBlock,
  CodeLine,
  Heading1,
  ListItem,
  OrderedList,
  Paragraph,
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
    },
  }
)

/**
 * Questions editor attributes
 */
const QAttributes: TEditableProps = {
  placeholder: 'Question...',
  className: 'p-4 selection:bg-primary/40',
  spellCheck: false,
}

/**
 * Answers editor attributes
 */
const AAttributes: TEditableProps = {
  placeholder: 'Answer...',
  className: 'p-4 selection:bg-secondary/40 bg-base-200 rounded-xl',
  spellCheck: false,
}

type EditorProps = {
  // this id isn't the flashcard database id, but rather a simple
  // autoincremented client-side id (i.d. `map`'s second argument)
  id: number
}

const Editor: FC<EditorProps> = ({ id }) => (
  <>
    <div className='mt-6 flex items-center justify-center'>
      <div className='flex items-center gap-4 rounded-t-xl bg-base-300/80 p-1'>
        <h2 className='pl-4 font-bold uppercase'>Card &#x2022; {id}</h2>
        <button className='btn-icon'>
          <MdDelete className='h-6 w-6' />
        </button>
      </div>
    </div>
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] rounded-xl bg-base-300 shadow-lg'>
      <Plate id={`qe-${id}`} editableProps={QAttributes} plugins={plugins} />
      <Plate id={`ae-${id}`} editableProps={AAttributes} plugins={plugins} />
    </div>
  </>
)

export default Editor
