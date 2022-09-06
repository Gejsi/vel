import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import { isBlockAboveEmpty, isSelectionAtBlockStart } from '@udecode/plate-core'
import { autoformatRules } from './autoformat.editor'

export const autoformatOptions = {
  options: {
    rules: autoformatRules as any,
    enableUndoOnDelete: true,
  },
}

const resetNodeCommonRules = {
  types: ['blockquote'],
  defaultType: 'p',
}

export const resetNodeOptions = {
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

export const exitBreakOptions = {
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

export const trailingBlockOptions = {
  options: { type: 'p' },
}

export const softBreakOptions = {
  options: {
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_CODE_BLOCK, 'blockquote'],
        },
      },
    ],
  },
}
