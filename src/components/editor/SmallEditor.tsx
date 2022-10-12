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
import { useAtom } from 'jotai'
import { answerAtom, questionAtom } from './TwinEditor'

const SmallEditor = ({
  className,
  placeholder,
  isQuestionEditor,
  onChange,
  onTransaction,
}: {
  className: string
  placeholder: string
  isQuestionEditor: boolean
  onChange: (questionValue?: JSONContent[], answerValue?: JSONContent[]) => void
  onTransaction: EditorOptions['onTransaction']
}) => {
  const [question, setQuestion] = useAtom(questionAtom)
  const [answer, setAnswer] = useAtom(answerAtom)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: {
          HTMLAttributes: {
            class:
              'rounded-xl text-info bg-base-content/10 px-[0.5ch] py-[0.5ch]',
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
    onTransaction,
    content: {
      type: 'doc',
      content: isQuestionEditor ? question : answer,
    },
  })

  return <EditorContent editor={editor} />
}

export default SmallEditor
