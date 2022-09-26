import {
  EditorContent,
  useEditor,
  type EditorOptions,
  type JSONContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = ({
  className,
  onUpdate,
  initalContent,
}: {
  className: string
  onUpdate: EditorOptions['onUpdate']
  initalContent?: JSONContent[]
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'prose p-4 max-w-none min-h-[6rem] h-full outline-none ' + className,
      },
    },
    onUpdate,
    content: initalContent,
  })

  return <EditorContent editor={editor} />
}

export default Editor
