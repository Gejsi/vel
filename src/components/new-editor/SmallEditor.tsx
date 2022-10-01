import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import {
  EditorContent,
  useEditor,
  type EditorOptions,
  type JSONContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useAtom } from 'jotai'

// fixes conflicting `Editor` type from `@tiptap/react` and `@tiptap/core`
import type { Editor } from '../../../node_modules/@tiptap/core/dist/packages/core/src/Editor'

export const editorAtom = atom<Editor | null>(null)

// This atom is used to re-render forcefully icon buttons in the toolbar.
export const toolbarForcedAtom = atom(0)

const SmallEditor = ({
  className,
  placeholder,
  onUpdate,
  initialContent,
}: {
  className: string
  placeholder: string
  onUpdate: EditorOptions['onUpdate']
  initialContent?: JSONContent[]
}) => {
  const [, setEditor] = useAtom(editorAtom)
  const [, forceUpdate] = useAtom(toolbarForcedAtom)

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: false,
          code: {
            HTMLAttributes: {
              class:
                'rounded-xl text-info bg-base-content/10 px-[1ch] py-[0.5ch]',
            },
          },
          horizontalRule: false,
          gapcursor: false,
          dropcursor: false,
        }),
        Underline,
        Placeholder.configure({
          placeholder,
        }),
      ],
      editorProps: {
        attributes: {
          class:
            'prose p-4 max-w-none overflow-y-auto min-h-[6rem] h-full outline-none ' +
            className,
        },
      },
      onUpdate,
      onTransaction(props) {
        setEditor(props.editor)
        forceUpdate((prev) => prev + 1)
      },
      content: {
        type: 'doc',
        content: initialContent,
      },
    },
    [className, onUpdate, initialContent]
  )

  return <EditorContent editor={editor} />
}

export default SmallEditor
