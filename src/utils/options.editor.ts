import type { AutoformatPlugin } from '@udecode/plate-autoformat'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import type { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break'
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import {
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

const resetNodeCommonRules = {
  //types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
  types: [ELEMENT_BLOCKQUOTE],
  defaultType: 'p',
}

export const resetNodeOptions: Partial<PlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        ...resetNodeCommonRules,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetNodeCommonRules,
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
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE],
        },
      },
    ],
  },
}
