import { EditorContent, useEditor } from '@tiptap/react'
import {
  commonEditorOptions,
  SmallEditorProps,
} from '../../utils/editor-options'

const ReadonlyEditor = ({
  className,
  placeholder,
  initialContent,
}: SmallEditorProps) => {
  const editor = useEditor(
    {
      ...commonEditorOptions({ className, placeholder, initialContent }),
      editable: false,
    },
    []
  )

  return <EditorContent editor={editor} />
}

export default ReadonlyEditor
