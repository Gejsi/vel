import type { PlateRenderElementProps } from '@udecode/plate-core'
import type { FC } from 'react'

export const Heading1: FC<PlateRenderElementProps> = (props) => (
  <h1 {...props.attributes} className={props.className}>
    {props.children}
  </h1>
)

export const Paragraph: FC<PlateRenderElementProps> = (props) => {
  return (
    <p {...props.attributes} className={props.className}>
      {props.children}
    </p>
  )
}

export const Blockquote: FC<PlateRenderElementProps> = (props) => (
  <blockquote {...props.attributes} className={props.className}>
    {props.children}
  </blockquote>
)

export const CodeBlock: FC<PlateRenderElementProps> = (props) => (
  <pre {...props.attributes} className={props.className}>
    <code className='block w-full'>{props.children}</code>
  </pre>
)

export const CodeLine: FC<PlateRenderElementProps> = (props) => (
  <div {...props.attributes} className={props.className}>
    {props.children}
  </div>
)

export const UnorderedList: FC<PlateRenderElementProps> = (props) => (
  <ul {...props.attributes} className={props.className}>
    {props.children}
  </ul>
)

export const OrderedList: FC<PlateRenderElementProps> = (props) => (
  <ol {...props.attributes} className={props.className}>
    {props.children}
  </ol>
)

export const ListItem: FC<PlateRenderElementProps> = (props) => (
  <li {...props.attributes} className={props.className}>
    {props.children}
  </li>
)
