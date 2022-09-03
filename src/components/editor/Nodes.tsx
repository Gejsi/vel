import type { FC, ReactNode, RefObject } from 'react'
import { twMerge } from 'tailwind-merge'

type TAttributes<R> = {
  'data-slate-node': 'element'
  ref: RefObject<R>
}

type Element<T> = {
  attributes: TAttributes<T>
  className: string
  children?: ReactNode
}

export const Heading1: FC<Element<HTMLHeadingElement>> = (props) => (
  <h1 {...props.attributes} className={twMerge(props.className, 'text-5xl')}>
    {props.children}
  </h1>
)

export const Paragraph: FC<Element<HTMLParagraphElement>> = (props) => (
  <p {...props.attributes} className={twMerge(props.className, 'text-lg')}>
    {props.children}
  </p>
)

export const Blockquote: FC<Element<HTMLQuoteElement>> = (props) => (
  <blockquote
    {...props.attributes}
    className={twMerge(props.className, 'italic')}
  >
    {props.children}
  </blockquote>
)
