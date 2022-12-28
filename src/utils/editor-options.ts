import type { EditorOptions } from '@tiptap/core'
import type { JSONContent } from '@tiptap/react'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'

export type EditorProps = {
  className: string
  placeholder: string
  initialContent?: JSONContent[]
}

export const commonEditorOptions = ({
  className,
  placeholder,
  initialContent,
}: EditorProps): Partial<EditorOptions> => ({
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
      showOnlyWhenEditable: false,
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
  content: {
    type: 'doc',
    content: initialContent,
  },
})
