import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor, type JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { atom, useAtom } from 'jotai'

// fixes conflicting `Editor` type from `@tiptap/react` and `@tiptap/core`
import type { Editor } from '../../../node_modules/@tiptap/core/dist/packages/core/src/Editor'
import { answerAtom, questionAtom } from './TwinEditor'

export const editorAtom = atom<Editor | null>(null)
// This atom is used to re-render forcefully icon buttons in the toolbar
export const toolbarForcedAtom = atom(0)

const SmallEditor = ({
  className,
  placeholder,
  isQuestionEditor,
  onChange,
}: {
  className: string
  placeholder: string
  isQuestionEditor: boolean
  onChange: (questionValue?: JSONContent[], answerValue?: JSONContent[]) => void
}) => {
  const [question, setQuestion] = useAtom(questionAtom)
  const [answer, setAnswer] = useAtom(answerAtom)

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
          spellcheck: 'false',
        },
      },
      onUpdate(editorProps) {
        const { content } = editorProps.editor.getJSON()
        if (isQuestionEditor) {
          onChange(content, answer)
          setQuestion(content)
        } else {
          onChange(question, content)
          setAnswer(content)
        }
      },
      onTransaction(editorProps) {
        setEditor(editorProps.editor)
        forceUpdate((prev) => prev + 1)
      },
      content: {
        type: 'doc',
        content: isQuestionEditor ? question : answer,
      },
    },
    []
  )

  return <EditorContent editor={editor} />
}

export default SmallEditor
