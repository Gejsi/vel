import {
  isCollapsed,
  isElementEmpty,
  TElement,
  useEditorState,
} from '@udecode/plate-core'
import { useMemo } from 'react'
import { useFocused, useSelected } from 'slate-react'

const usePlaceholder = ({
  element,
  hideOnBlur,
}: {
  element: TElement
  hideOnBlur: boolean
}) => {
  const focused = useFocused()
  const selected = useSelected()
  const editor = useEditorState()

  const isEmptyBlock = isElementEmpty(editor, element)

  return useMemo(
    () =>
      isEmptyBlock &&
      (!hideOnBlur || (isCollapsed(editor.selection) && focused && selected)),
    [isEmptyBlock, focused, selected, editor.selection, hideOnBlur]
  )
}

export default usePlaceholder
