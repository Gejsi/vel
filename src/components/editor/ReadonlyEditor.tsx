import { EditorContent, useEditor } from '@tiptap/react'
import { commonEditorOptions, EditorProps } from '../../utils/editor-options'

const ReadonlyEditor = ({
  className,
  placeholder,
  initialContent,
}: EditorProps) => {
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
