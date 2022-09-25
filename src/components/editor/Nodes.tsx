import type { PlateRenderElementProps } from '@udecode/plate-core'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import usePlaceholder from '../../hooks/use-placeholder'

export const Heading1 = (props: PlateRenderElementProps) => (
  <h1 {...props.attributes} className={props.className}>
    {props.children}
  </h1>
)

export const Paragraph = (props: PlateRenderElementProps) => {
  const isPlaceholderVisible = usePlaceholder({
    element: props.element,
    hideOnBlur: false,
  })

  return (
    <p
      {...props.attributes}
      className={twMerge(
        props.className,
        clsx({ 'before:content-none': !isPlaceholderVisible })
      )}
    >
      {props.children}
    </p>
  )
}

export const Blockquote = (props: PlateRenderElementProps) => (
  <blockquote {...props.attributes} className={props.className}>
    {props.children}
  </blockquote>
)

export const CodeBlock = (props: PlateRenderElementProps) => (
  <pre {...props.attributes} className={props.className}>
    <code className='block w-full'>{props.children}</code>
  </pre>
)

export const CodeLine = (props: PlateRenderElementProps) => (
  <div {...props.attributes} className={props.className}>
    {props.children}
  </div>
)

export const UnorderedList = (props: PlateRenderElementProps) => (
  <ul {...props.attributes} className={props.className}>
    {props.children}
  </ul>
)

export const OrderedList = (props: PlateRenderElementProps) => (
  <ol {...props.attributes} className={props.className}>
    {props.children}
  </ol>
)

export const ListItem = (props: PlateRenderElementProps) => (
  <li {...props.attributes} className={props.className}>
    {props.children}
  </li>
)

export const BoldItem = (props: PlateRenderElementProps) => (
  <strong {...props.attributes} className={props.className}>
    {props.children}
  </strong>
)

export const ItalicItem = (props: PlateRenderElementProps) => (
  <em {...props.attributes} className={props.className}>
    {props.children}
  </em>
)

export const UnderlineItem = (props: PlateRenderElementProps) => (
  <u {...props.attributes} className={props.className}>
    {props.children}
  </u>
)

export const StrikethroughItem = (props: PlateRenderElementProps) => (
  <del {...props.attributes} className={props.className}>
    {props.children}
  </del>
)

export const InlineCodeItem = (props: PlateRenderElementProps) => (
  <code {...props.attributes} className={props.className}>
    {props.children}
  </code>
)
