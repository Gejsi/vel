import { createBasicElementsPlugin } from '@udecode/plate-basic-elements'
import { createPlugins, Plate, type TEditableProps } from '@udecode/plate-core'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Blockquote, CodeBlock, CodeLine, Heading1, Paragraph } from './Nodes'

const plugins = createPlugins([createBasicElementsPlugin()], {
  components: {
    blockquote: Blockquote,
    p: Paragraph,
    h1: Heading1,
    code_block: CodeBlock,
    code_line: CodeLine,
  },
})

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
    children: [{ type: 'code_line', children: [{ text: 'const a = 2' }] }],
  },
]

const commonEditorClasses = 'min-h-[12rem] p-4 rounded-xl'

/**
 * Questions editor props
 */
const QAttributes: TEditableProps = {
  placeholder: 'Question...',
  className: twMerge(commonEditorClasses, 'bg-primary/20'),
  spellCheck: false,
}

/**
 * Answers editor props
 */
const AAttributes: TEditableProps = {
  placeholder: 'Answer...',
  className: twMerge(commonEditorClasses, 'bg-secondary/20'),
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
