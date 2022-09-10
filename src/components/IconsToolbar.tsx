import { useEventPlateId, usePlateEditorState } from '@udecode/plate-core'
import { ELEMENT_UL } from '@udecode/plate-list'
import clsx from 'clsx'
import { BiCodeBlock } from 'react-icons/bi'
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatQuote,
  MdFormatStrikethrough,
  MdFormatUnderlined,
  MdMenu,
  MdSave,
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { formatList } from '../utils/format.editor'

const Button = () => {
  const id = useEventPlateId()
  const editor = usePlateEditorState(id)

  console.log(editor)

  return (
    <button
      className='btn-icon'
      onClick={() => editor && formatList(editor, ELEMENT_UL)}
    >
      <MdFormatListBulleted className='h-6 w-6' />
    </button>
  )
}

const IconsToolbar = () => {
  const iconClass = twMerge('btn-icon', clsx({ 'btn-active': false }))

  return (
    <nav className='border-b-solid sticky top-0 z-10 mb-4 border-b-2 border-b-base-content/10 bg-base-100 pt-4'>
      <div className='mb-6 flex items-center gap-4'>
        <label tabIndex={0} htmlFor='sidebar' className='btn-icon lg:hidden'>
          <MdMenu className='h-6 w-6' />
        </label>
        <div className='flex flex-1 flex-nowrap overflow-y-auto'>
          <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
            {/* <button
              className={iconClass}
              onClick={() => editor && formatList(editor, ELEMENT_UL)}
            >
              <MdFormatListBulleted className='h-6 w-6' />
            </button>
            <button
              className={iconClass}
              onClick={() => editor && formatList(editor, ELEMENT_OL)}
            >
              <MdFormatListNumbered className='h-6 w-6' />
            </button> */}
            <Button />
            <button className={iconClass}>
              <MdFormatQuote className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <BiCodeBlock className='h-6 w-6' />
            </button>
            <div className='w-[0.125rem] bg-base-content/30' />
            <button className={iconClass}>
              <MdFormatBold className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdFormatItalic className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdFormatUnderlined className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdFormatStrikethrough className='h-6 w-6' />
            </button>
            <button className={iconClass}>
              <MdCode className='h-6 w-6' />
            </button>
          </div>
        </div>

        <button className='btn btn-primary gap-2'>
          <MdSave className='h-6 w-6' />
          <span className='hidden md:block'>Save</span>
        </button>
      </div>
    </nav>
  )
}

export default IconsToolbar
