import {
  someNode,
  useEventPlateId,
  usePlateEditorState,
  withPlateEventProvider,
} from '@udecode/plate-core'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { formatBlock, TBlock } from '../../utils/format.editor'

const BlockIconButton = withPlateEventProvider(
  ({ type, children }: { type: TBlock; children: ReactNode }) => {
    const id = useEventPlateId()
    const editor = usePlateEditorState(id)

    const iconClass = twMerge(
      'btn-icon',
      clsx({
        'btn-active':
          !!editor?.selection &&
          someNode(editor, {
            match: { type },
          }),
      })
    )

    return (
      <button
        className={iconClass}
        onClick={() => editor && formatBlock(editor, type)}
      >
        {children}
      </button>
    )
  }
)

export default BlockIconButton
