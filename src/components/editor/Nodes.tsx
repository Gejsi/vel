import {} from '@udecode/plate-common'
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
  <div {...props.attributes} className={props.className}>
    {props.children}
  </div>
)

export const CodeLine: FC<PlateRenderElementProps> = (props) => (
  <pre {...props.attributes} className={props.className}>
    <code>{props.children}</code>
  </pre>
)
