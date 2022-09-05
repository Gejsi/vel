import { createBasicElementsPlugin } from '@udecode/plate-basic-elements'
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks'
import { createPlugins, Plate, type TEditableProps } from '@udecode/plate-core'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Blockquote, CodeBlock, CodeLine, Heading1, Paragraph } from './Nodes'

const plugins = createPlugins(
  [createBasicElementsPlugin(), createBasicMarksPlugin()],
  {
    components: {
      blockquote: Blockquote,
      p: Paragraph,
      h1: Heading1,
      code_block: CodeBlock,
      code_line: CodeLine,
    },
  }
)

const initialValue = [
  {
    type: 'h1',
    children: [{ text: 'Title' }],
  },
  {
    type: 'p',
    children: [{ text: 'Lorem ipsum' }],
  },
  {
    type: 'blockquote',
    children: [{ text: 'Lorem ipsum' }],
  },
  {
    type: 'code_block',
    lang: 'javascript',
    children: [
      { type: 'code_line', children: [{ text: 'const a = 2' }] },
      { type: 'code_line', children: [{ text: 'const b = 3' }] },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This text is', bold: true },
      { text: ' bold ' },
      { text: 'kinda.', bold: true },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This text is', italic: true },
      { text: ' italic ' },
      { text: 'kinda.', italic: true },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This text is', underline: true },
      { text: ' underlined ' },
      { text: 'kinda.', underline: true },
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: 'This text is everything',
        underline: true,
        bold: true,
        italic: true,
        strikethrough: true,
      },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This text is', strikethrough: true },
      { text: ' striked ' },
      { text: 'kinda.', strikethrough: true },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'This text is', code: true },
      { text: ' inline code ' },
      { text: 'kinda.', code: true },
    ],
  },
]

const commonEditorClasses = 'min-h-[12rem] p-4 rounded-xl'

/**
 * Questions editor props
 */
const QAttributes: TEditableProps = {
  placeholder: 'Question...',
  className: twMerge(commonEditorClasses, 'bg-primary/5'),
  spellCheck: false,
}

/**
 * Answers editor props
 */
const AAttributes: TEditableProps = {
  placeholder: 'Answer...',
  className: twMerge(commonEditorClasses, 'bg-secondary/5'),
  spellCheck: false,
}

type EditorProps = {
  id: number
}

// TODO: try wrapping `Plate` with the `prose` className
const Editor: FC<EditorProps> = ({ id }) => {
  return (
    <div className='mt-4 grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-4'>
      <Plate
        id={`qe-${id}`}
        editableProps={QAttributes}
        plugins={plugins}
        initialValue={initialValue}
      />
      <Plate id={`ae-${id}`} editableProps={AAttributes} />
    </div>
  )
}

export default Editor
