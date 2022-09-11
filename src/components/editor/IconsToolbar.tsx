import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'
import clsx from 'clsx'
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
  MdSave,
} from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import BlockIconButton from './BlockIconButton'
import MarkIconButton from './MarkIconButton'

const IconsToolbar = () => {
  // FIX: temp class, will be removed soon
  const iconClass = twMerge('btn-icon', clsx({ 'btn-active': false }))

  return (
    <nav className='border-b-solid sticky top-0 z-10 mb-4 border-b-2 border-b-base-content/10 bg-base-100 pt-4'>
      <div className='mb-6 flex items-center gap-4'>
        <label tabIndex={0} htmlFor='sidebar' className='btn-icon lg:hidden'>
          <MdMenu className='h-6 w-6' />
        </label>
        <div className='flex flex-1 flex-nowrap overflow-y-auto'>
          <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
            <BlockIconButton type={ELEMENT_UL}>
              <MdFormatListBulleted className='h-6 w-6' />
            </BlockIconButton>
            <BlockIconButton type={ELEMENT_OL}>
              <MdFormatListNumbered className='h-6 w-6' />
            </BlockIconButton>
            <BlockIconButton type={ELEMENT_BLOCKQUOTE}>
              <MdFormatQuote className='h-6 w-6' />
            </BlockIconButton>
            <BlockIconButton type={ELEMENT_CODE_BLOCK}>
              <BiCodeBlock className='h-6 w-6' />
            </BlockIconButton>
            <div className='w-[0.125rem] bg-base-content/30' />
            <MarkIconButton type={MARK_BOLD}>
              <MdFormatBold className='h-6 w-6' />
            </MarkIconButton>
            <MarkIconButton type={MARK_ITALIC}>
              <MdFormatItalic className='h-6 w-6' />
            </MarkIconButton>
            <MarkIconButton type={MARK_UNDERLINE}>
              <MdFormatUnderlined className='h-6 w-6' />
            </MarkIconButton>
            <MarkIconButton type={MARK_STRIKETHROUGH}>
              <MdFormatStrikethrough className='h-6 w-6' />
            </MarkIconButton>
            <MarkIconButton type={MARK_CODE}>
              <MdCode className='h-6 w-6' />
            </MarkIconButton>
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
