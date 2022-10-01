import { Underline } from '@tiptap/extension-underline'
import {
  EditorContent,
  useEditor,
  type EditorOptions,
  type JSONContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useAtom } from 'jotai'
import type { Editor } from '../../../node_modules/@tiptap/core/dist/packages/core/src/Editor'

export const editorAtom = atom<Editor | null>(null)

// This atom is used to re-render forcefully icon buttons in the toolbar.
export const toolbarForcedAtom = atom(0)

const SmallEditor = ({
  className,
  onUpdate,
  initalContent,
}: {
  className: string
  onUpdate: EditorOptions['onUpdate']
  initalContent?: JSONContent[]
}) => {
  const [, setEditor] = useAtom(editorAtom)
  const [, forceUpdate] = useAtom(toolbarForcedAtom)

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: false,
        }),
        Underline,
      ],
      editorProps: {
        attributes: {
          class:
            'prose p-4 max-w-none overflow-y-auto min-h-[6rem] h-full outline-none ' +
            className,
        },
      },
      onUpdate,
      content: initalContent,
      onTransaction(props) {
        setEditor(props.editor)
        forceUpdate((prev) => prev + 1)
      },
    },
    [className, onUpdate, initalContent]
  )

  return <EditorContent editor={editor} />
}

export default SmallEditor
