import { clsx } from 'clsx'
import { useAtomValue } from 'jotai'
import { ReactNode } from 'react'
import { BiCodeBlock } from 'react-icons/bi'
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdMenu,
  MdRedo,
  MdUndo,
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { editorAtom, toolbarForcedAtom } from './TwinEditor'

const IconsToolbar = ({ children }: { children?: ReactNode }) => {
  useAtomValue(toolbarForcedAtom)
  const editor = useAtomValue(editorAtom)

  return (
    <nav className='sticky top-0 z-10 mb-4 bg-base-100 px-4 pt-4 lg:px-8'>
      <div className='mb-6 flex items-center gap-4'>
        <label tabIndex={0} htmlFor='sidebar' className='btn-icon lg:hidden'>
          <MdMenu className='h-6 w-6' />
        </label>

        <div className='flex flex-1 flex-nowrap overflow-y-auto'>
          <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('bulletList'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              title='Bulleted List'
            >
              <MdFormatListBulleted className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('orderedList'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              title='Numbered List'
            >
              <MdFormatListNumbered className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('blockquote'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              title='Blockquote (ctrl+shift+.)'
            >
              <MdFormatQuote className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('codeBlock'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              title='Code Block'
            >
              <BiCodeBlock className='h-6 w-6' />
            </button>

            {/* Vertical divider */}
            <div className='w-[0.125rem] bg-base-content/30' />

            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('bold'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleBold().run()}
              title='Bold (ctrl+b)'
            >
              <MdFormatBold className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('italic'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title='Italic (ctrl+i)'
            >
              <MdFormatItalic className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('underline'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              title='Underline (ctrl+u)'
            >
              <MdFormatUnderlined className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('strike'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              title='Strikethrough (ctrl+shift+x)'
            >
              <MdFormatStrikethrough className='h-6 w-6' />
            </button>
            <button
              disabled={!editor}
              className={twMerge(
                'btn-icon',
                clsx({
                  'btn-active': editor?.isActive('code'),
                })
              )}
              onClick={() => editor?.chain().focus().toggleCode().run()}
              title='Inline code (ctrl+e)'
            >
              <MdCode className='h-6 w-6' />
            </button>

            {/* Vertical divider */}
            <div className='w-[0.125rem] bg-base-content/30' />

            <button
              disabled={!editor || !editor?.can().chain().focus().undo().run()}
              className='btn-icon'
              onClick={() => editor?.chain().focus().undo().run()}
              title='Undo (ctrl+z)'
            >
              <MdUndo className='h-6 w-6' />
            </button>
            <button
              disabled={!editor || !editor?.can().chain().focus().redo().run()}
              className='btn-icon'
              onClick={() => editor?.chain().focus().redo().run()}
              title='Redo (ctrl+shift+z)'
            >
              <MdRedo className='h-6 w-6' />
            </button>
          </div>
        </div>

        {children}
      </div>
      <div className='divider m-0 h-fit' />
    </nav>
  )
}

export default IconsToolbar
