import { createBasicElementsPlugin } from '@udecode/plate-basic-elements'
import { createPlugins, Plate, type TEditableProps } from '@udecode/plate-core'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Blockquote, Heading1, Paragraph } from './Nodes'

const plugins = createPlugins([createBasicElementsPlugin()], {
  components: {
    blockquote: Blockquote,
    p: Paragraph,
    h1: Heading1,
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
]

const commonEditorClasses = 'min-h-[12rem] p-4 rounded-xl'

/**
 * Questions editor props
 */
const QAttrs: TEditableProps = {
  placeholder: 'Question...',
  className: twMerge(commonEditorClasses, 'bg-primary/20'),
}

/**
 * Answers editor props
 */
const AAttrs: TEditableProps = {
  placeholder: 'Answer...',
  className: twMerge(commonEditorClasses, 'bg-secondary/20'),
}

type EditorProps = {
  id: number
}

const Editor: FC<EditorProps> = ({ id }) => {
  return (
    <div className='mt-4 grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-4'>
      <Plate
        id={`qe-${id}`}
        editableProps={QAttrs}
        plugins={plugins}
        initialValue={initialValue}
      />
      <Plate id={`ae-${id}`} editableProps={AAttrs} />
    </div>
  )
}

export default Editor
