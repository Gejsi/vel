import type { FC, ReactNode, RefObject } from 'react'

type Attributes<R> = {
  'data-slate-node': 'element'
  ref: RefObject<R>
}

type Element = {
  type: string
  lang?: string
}

type BlockProps<T> = {
  attributes: Attributes<T>
  className: string
  children?: ReactNode
  element: Element
}

export const Heading1: FC<BlockProps<HTMLHeadingElement>> = (props) => (
  <h1 {...props.attributes} className={props.className}>
    {props.children}
  </h1>
)

export const Paragraph: FC<BlockProps<HTMLParagraphElement>> = (props) => {
  return (
    <p {...props.attributes} className={props.className}>
      {props.children}
    </p>
  )
}

export const Blockquote: FC<BlockProps<HTMLQuoteElement>> = (props) => (
  <blockquote {...props.attributes} className={props.className}>
    {props.children}
  </blockquote>
)

export const CodeBlock: FC<BlockProps<HTMLDivElement>> = (props) => (
  <div {...props.attributes} className={props.className}>
    {props.children}
  </div>
)

export const CodeLine: FC<BlockProps<HTMLPreElement>> = (props) => (
  <pre {...props.attributes} className={props.className}>
    <code>{props.children}</code>
  </pre>
)
