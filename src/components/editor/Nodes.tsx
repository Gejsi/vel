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
  <h1 {...props.attributes} className='text-5xl'>
    {props.children}
  </h1>
)

export const Paragraph: FC<BlockProps<HTMLParagraphElement>> = (props) => (
  <p {...props.attributes} className='text-lg'>
    {props.children}
  </p>
)

export const Blockquote: FC<BlockProps<HTMLQuoteElement>> = (props) => (
  <blockquote {...props.attributes} className='italic'>
    {props.children}
  </blockquote>
)

export const CodeBlock: FC<BlockProps<HTMLDivElement>> = (props) => (
  <div {...props.attributes} className='mockup-code my-2 before:hidden'>
    {props.children}
  </div>
)

export const CodeLine: FC<BlockProps<HTMLPreElement>> = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
)
