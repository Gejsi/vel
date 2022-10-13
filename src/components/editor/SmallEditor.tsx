import type { Editor } from '@tiptap/core'
import CharacterCount from '@tiptap/extension-character-count'
import { Placeholder } from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import {
  EditorContent,
  useEditor,
  type EditorOptions,
  type JSONContent,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useAtom } from 'jotai'

export const editorAtom = atom<Editor | null>(null)
// This atom is used to re-render forcefully icon buttons in the toolbar
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
          horizontalRule: false,
          gapcursor: false,
          dropcursor: false,
          code: {
            HTMLAttributes: {
              class:
                'rounded-xl text-info bg-base-content/10 px-[0.5ch] py-[0.5ch]',
            },
          },
        }),
        Underline,
        Placeholder.configure({
          placeholder,
        }),
        CharacterCount.configure({
          limit: 600,
        }),
        Typography,
      ],
      editorProps: {
        attributes: {
          class:
            'prose p-4 max-w-none overflow-y-auto min-h-[6rem] max-h-72 h-full outline-none ' +
            className,
          spellcheck: 'false',
        },
      },
      onUpdate,
      onTransaction(editorProps) {
        setEditor(editorProps.editor)
        forceUpdate((prev) => prev + 1)
      },
      content: {
        type: 'doc',
        content: initialContent,
      },
    },
    []
  )

  return <EditorContent editor={editor} />
}

export default SmallEditor
