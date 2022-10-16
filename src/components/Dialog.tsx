import {
  Close,
  Content,
  Description,
  Portal,
  Root,
  Title,
} from '@radix-ui/react-dialog'
import type { ComponentProps, ReactNode } from 'react'

export const Dialog = Root

export const DialogContent = ({ children }: { children: ReactNode }) => (
  <Portal>
    <div className='modal modal-open modal-bottom animate-fadeIn md:modal-middle'>
      <Content className='modal-box z-[101] animate-slideUp'>
        {children}
      </Content>
    </div>
  </Portal>
)

export const DialogAction = Close

export const DialogTitle = (props: ComponentProps<typeof Title>) => (
  <Title className='text-2xl' {...props} />
)

export const DialogDescription = Description
