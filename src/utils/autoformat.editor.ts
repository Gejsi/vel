import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from '@udecode/plate-code-block'
import {
  ELEMENT_DEFAULT,
  getPluginType,
  insertNodes,
  setNodes,
} from '@udecode/plate-core'
import { preFormat } from './format.editor'

const autoformatBlocks = [
  {
    mode: 'block',
    type: 'h1',
    match: '# ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'h2',
    match: '## ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'h3',
    match: '### ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'h4',
    match: '#### ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'h5',
    match: '##### ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'h6',
    match: '###### ',
    preFormat,
  },
  {
    mode: 'block',
    type: 'blockquote',
    match: '> ',
    preFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_CODE_BLOCK,
    match: '```',
    triggerAtBlockStart: false,
    preFormat,
    format: (editor: any) => {
      insertEmptyCodeBlock(editor, {
        defaultType: getPluginType(editor, ELEMENT_DEFAULT),
        insertNodesOptions: { select: true },
      })
    },
  },
  {
    mode: 'block',
    type: 'hr',
    match: ['---', '—-', '___ '],
    format: (editor: any) => {
      setNodes(editor, { type: 'hr' })
      insertNodes(editor, {
        type: ELEMENT_DEFAULT,
        children: [{ text: '' }],
      })
    },
  },
]

export const autoformatMarks = [
  {
    mode: 'mark',
    type: [MARK_BOLD, MARK_ITALIC],
    match: '***',
  },
  {
    mode: 'mark',
    type: [MARK_UNDERLINE, MARK_ITALIC],
    match: '__*',
  },
  {
    mode: 'mark',
    type: [MARK_UNDERLINE, MARK_BOLD],
    match: '__**',
  },
  {
    mode: 'mark',
    type: [MARK_UNDERLINE, MARK_BOLD, MARK_ITALIC],
    match: '___***',
  },
  {
    mode: 'mark',
    type: MARK_BOLD,
    match: '**',
  },
  {
    mode: 'mark',
    type: MARK_UNDERLINE,
    match: '__',
  },
  {
    mode: 'mark',
    type: MARK_ITALIC,
    match: '*',
  },
  {
    mode: 'mark',
    type: MARK_ITALIC,
    match: '_',
  },
  {
    mode: 'mark',
    type: MARK_STRIKETHROUGH,
    match: '~~',
  },
  {
    mode: 'mark',
    type: MARK_CODE,
    match: '`',
  },
]

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatMarks,
  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
]
