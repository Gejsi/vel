import {
  isMarkActive,
  useEventPlateId,
  usePlateEditorState,
  withPlateEventProvider,
} from '@udecode/plate-core'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { formatMark, TMark } from '../../utils/format.editor'

const MarkIconButton = withPlateEventProvider(
  ({ type, children }: { type: TMark; children: ReactNode }) => {
    const id = useEventPlateId()
    const editor = usePlateEditorState(id)

    const iconClass = twMerge(
      'btn-icon',
      clsx({
        'btn-active': !!editor?.selection && isMarkActive(editor, type),
      })
    )

    return (
      <button
        className={iconClass}
        onClick={() => editor && formatMark(editor, type)}
      >
        {children}
      </button>
    )
  }
)

export default MarkIconButton
