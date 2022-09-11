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
  ({
    type,
    title,
    children,
  }: {
    type: TMark
    title: string
    children: ReactNode
  }) => {
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
        title={title}
      >
        {children}
      </button>
    )
  }
)

export default MarkIconButton
