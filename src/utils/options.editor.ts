import type { AutoformatPlugin } from '@udecode/plate-autoformat'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import type { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break'
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/plate-code-block'
import {
  ELEMENT_DEFAULT,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  type PlatePlugin,
} from '@udecode/plate-core'
import type { ResetNodePlugin } from '@udecode/plate-reset-node'
import type { TrailingBlockPlugin } from '@udecode/plate-trailing-block'
import { autoformatRules } from './autoformat.editor'

export const autoformatOptions: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    rules: autoformatRules,
    enableUndoOnDelete: true,
  },
}

export const resetNodeOptions: Partial<PlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        types: [ELEMENT_BLOCKQUOTE],
        defaultType: ELEMENT_DEFAULT,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        types: [ELEMENT_BLOCKQUOTE],
        defaultType: ELEMENT_DEFAULT,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
}

export const exitBreakOptions: Partial<PlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
      },
    ],
  },
}

export const trailingBlockOptions: Partial<PlatePlugin<TrailingBlockPlugin>> = {
  options: { type: 'p' },
}

export const softBreakOptions: Partial<PlatePlugin<SoftBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'shift+enter',
        query: { exclude: [ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE] },
      },
      {
        hotkey: 'enter',
        query: {
          allow: ELEMENT_BLOCKQUOTE,
        },
      },
    ],
  },
}
