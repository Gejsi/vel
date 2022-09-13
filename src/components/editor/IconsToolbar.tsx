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
import BlockIconButton from './BlockIconButton'
import MarkIconButton from './MarkIconButton'

const IconsToolbar = () => (
  <nav className='sticky top-0 z-10 mb-4 bg-base-100 px-4 pt-4 lg:px-8'>
    <div className='mb-6 flex items-center gap-4'>
      <label tabIndex={0} htmlFor='sidebar' className='btn-icon lg:hidden'>
        <MdMenu className='h-6 w-6' />
      </label>
      <div className='flex flex-1 flex-nowrap overflow-y-auto'>
        <div className='btn-group flex-nowrap rounded-lg bg-base-content/10'>
          <BlockIconButton type={ELEMENT_UL} title='Bulleted List'>
            <MdFormatListBulleted className='h-6 w-6' />
          </BlockIconButton>
          <BlockIconButton type={ELEMENT_OL} title='Numbered List'>
            <MdFormatListNumbered className='h-6 w-6' />
          </BlockIconButton>
          <BlockIconButton
            type={ELEMENT_BLOCKQUOTE}
            title='Blockquote (ctrl+shift+.)'
          >
            <MdFormatQuote className='h-6 w-6' />
          </BlockIconButton>
          <BlockIconButton type={ELEMENT_CODE_BLOCK} title='Code Block'>
            <BiCodeBlock className='h-6 w-6' />
          </BlockIconButton>
          <div className='w-[0.125rem] bg-base-content/30' />
          <MarkIconButton type={MARK_BOLD} title='Bold (ctrl+b)'>
            <MdFormatBold className='h-6 w-6' />
          </MarkIconButton>
          <MarkIconButton type={MARK_ITALIC} title='Italic (ctrl+i)'>
            <MdFormatItalic className='h-6 w-6' />
          </MarkIconButton>
          <MarkIconButton type={MARK_UNDERLINE} title='Underline (ctrl+u)'>
            <MdFormatUnderlined className='h-6 w-6' />
          </MarkIconButton>
          <MarkIconButton
            type={MARK_STRIKETHROUGH}
            title='Underline (ctrl+shift+x)'
          >
            <MdFormatStrikethrough className='h-6 w-6' />
          </MarkIconButton>
          <MarkIconButton type={MARK_CODE} title='Underline (ctrl+e)'>
            <MdCode className='h-6 w-6' />
          </MarkIconButton>
        </div>
      </div>

      <button className='btn btn-primary gap-2'>
        <MdSave className='h-6 w-6' />
        <span className='hidden md:block'>Save</span>
      </button>
    </div>
    <div className='divider m-0 h-fit' />
  </nav>
)

export default IconsToolbar
