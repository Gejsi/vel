import type { AutoformatBlockRule } from '@udecode/plate-autoformat'
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@udecode/plate-code-block'
import {
  getParentNode,
  isElement,
  isType,
  type PlateEditor,
} from '@udecode/plate-core'
import {
  ELEMENT_OL,
  ELEMENT_UL,
  toggleList,
  unwrapList,
} from '@udecode/plate-list'

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  unwrapList(editor)

export const format = (editor: PlateEditor, customFormatting: any) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection)
    if (!parentEntry) return

    const [node] = parentEntry
    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting()
    }
  }
}

type TList = typeof ELEMENT_OL | typeof ELEMENT_UL

export const formatList = (editor: PlateEditor, elementType: TList) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  )
}

export type TBlock =
  | TList
  | typeof ELEMENT_BLOCKQUOTE
  | typeof ELEMENT_CODE_BLOCK

export const formatBlock = (editor: PlateEditor, elementType: TBlock) => {
  if (elementType === 'ol' || elementType === 'ul') {
    formatList(editor, elementType)
  }
  // TODO: add other blocks formatting
}
