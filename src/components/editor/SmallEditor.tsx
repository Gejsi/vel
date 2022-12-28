import type { Editor, EditorOptions } from '@tiptap/core'
import { EditorContent, useEditor } from '@tiptap/react'
import { atom, useAtom } from 'jotai'
import {
  commonEditorOptions,
  SmallEditorProps,
} from '../../utils/editor-options'

export const editorAtom = atom<Editor | null>(null)
// This atom is used to re-render forcefully icon buttons in the toolbar
export const toolbarForcedAtom = atom(0)

const SmallEditor = ({
  className,
  placeholder,
  initialContent,
  onUpdate,
}: SmallEditorProps & {
  onUpdate: EditorOptions['onUpdate']
}) => {
  const [, setEditor] = useAtom(editorAtom)
  const [, forceUpdate] = useAtom(toolbarForcedAtom)

  const editor = useEditor(
    {
      ...commonEditorOptions({ className, placeholder, initialContent }),
      onUpdate,
      onTransaction(editorProps) {
        setEditor(editorProps.editor)
        forceUpdate((prev) => prev + 1)
      },
      onDestroy() {
        setEditor(null)
      },
    },
    []
  )

  return <EditorContent editor={editor} />
}

export default SmallEditor
