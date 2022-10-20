import {
  Close,
  Content,
  Description,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog'
import {
  forwardRef,
  type ComponentProps,
  type ElementRef,
  type ReactNode,
} from 'react'

export const Modal = Root

export const ModalContent = ({ children }: { children: ReactNode }) => (
  <Portal>
    <div className='modal modal-open modal-bottom animate-fadeIn md:modal-middle'>
      <Content className='modal-box z-[101] animate-slideUp'>
        {children}
      </Content>
    </div>
  </Portal>
)

export const ModalClose = forwardRef<
  ElementRef<typeof Close>,
  ComponentProps<typeof Close>
>(({ asChild, children, ...props }, forwardedRef) => (
  <Close asChild {...props} ref={forwardedRef}>
    {children}
  </Close>
))

export const ModalTitle = (props: ComponentProps<typeof Title>) => (
  <Title className='mb-4 text-2xl' {...props} />
)

export const ModalDescription = Description
