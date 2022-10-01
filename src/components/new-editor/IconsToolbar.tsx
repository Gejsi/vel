import { useAtom } from 'jotai'
import type { ReactNode } from 'react'
import { BiCodeBlock } from 'react-icons/bi'
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdMenu,
  MdRedo,
  MdUndo,
} from 'react-icons/md'
import IconButton from './IconButton'
import { editorAtom } from './SmallEditor'
import UndoRedoButton from './UndoRedoButton'

const IconsToolbar = ({ children }: { children?: ReactNode }) => {
  const [editor] = useAtom(editorAtom)

  return (
    <nav className='sticky top-0 z-10 mb-4 bg-base-100 px-4 pt-4 lg:px-8'>
      <div className='mb-6 flex items-center gap-4'>
        <label tabIndex={0} htmlFor='sidebar' className='btn-icon lg:hidden'>
          <MdMenu className='h-6 w-6' />
        </label>

        <div className='flex flex-1 flex-nowrap overflow-y-auto'>
          <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
            <IconButton
              name='bulletList'
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              title='Bulleted List'
            >
              <MdFormatListBulleted className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='orderedList'
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              title='Numbered List'
            >
              <MdFormatListNumbered className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='blockquote'
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              title='Blockquote (ctrl+shift+.)'
            >
              <MdFormatQuote className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='codeBlock'
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              title='Code Block'
            >
              <BiCodeBlock className='h-6 w-6' />
            </IconButton>

            {/* Vertical divider */}
            <div className='w-[0.125rem] bg-base-content/30' />

            <IconButton
              name='bold'
              onClick={() => editor?.chain().focus().toggleBold().run()}
              title='Bold (ctrl+b)'
            >
              <MdFormatBold className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='italic'
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title='Italic (ctrl+i)'
            >
              <MdFormatItalic className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='strike'
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              title='Strikethrough (ctrl+shift+x)'
            >
              <MdFormatStrikethrough className='h-6 w-6' />
            </IconButton>
            <IconButton
              name='code'
              onClick={() => editor?.chain().focus().toggleCode().run()}
              title='Inline code (ctrl+e)'
            >
              <MdCode className='h-6 w-6' />
            </IconButton>

            {/* Vertical divider */}
            <div className='w-[0.125rem] bg-base-content/30' />

            <UndoRedoButton
              icon='undo'
              onClick={() => editor?.chain().focus().undo().run()}
              title='Undo (ctrl+z)'
            >
              <MdUndo className='h-6 w-6' />
            </UndoRedoButton>
            <UndoRedoButton
              icon='redo'
              onClick={() => editor?.chain().focus().redo().run()}
              title='Redo (ctrl+shift+z)'
            >
              <MdRedo className='h-6 w-6' />
            </UndoRedoButton>
          </div>
        </div>

        {children}
      </div>
      <div className='divider m-0 h-fit' />
    </nav>
  )
}

export default IconsToolbar
