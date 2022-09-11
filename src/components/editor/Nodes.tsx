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

export const BoldItem: FC<PlateRenderElementProps> = (props) => (
  <strong {...props.attributes} className={props.className}>
    {props.children}
  </strong>
)

export const ItalicItem: FC<PlateRenderElementProps> = (props) => (
  <em {...props.attributes} className={props.className}>
    {props.children}
  </em>
)

export const UnderlineItem: FC<PlateRenderElementProps> = (props) => (
  <u {...props.attributes} className={props.className}>
    {props.children}
  </u>
)

export const StrikethroughItem: FC<PlateRenderElementProps> = (props) => (
  <del {...props.attributes} className={props.className}>
    {props.children}
  </del>
)

export const InlineCodeItem: FC<PlateRenderElementProps> = (props) => (
  <code {...props.attributes} className={props.className}>
    {props.children}
  </code>
)
