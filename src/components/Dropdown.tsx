import {
  Arrow,
  Content,
  Group,
  Item,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu'
import {
  forwardRef,
  type ComponentProps,
  type ElementRef,
  type ReactNode,
} from 'react'

export const Dropdown = Root

export const DropdownTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentProps<typeof Trigger>
>(({ asChild, ...props }, forwardedRef) => (
  <Trigger asChild {...props} ref={forwardedRef} />
))

export const DropdownContent = ({ children }: { children: ReactNode }) => (
  <Portal>
    <Content loop className='dropdown-container'>
      <Group asChild>
        <ul className='menu'>{children}</ul>
      </Group>
      <Arrow className='m-[2px] fill-current text-base-content/40' />
    </Content>
  </Portal>
)

export const DropdownItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentProps<typeof Item>
>(({ asChild, children, ...props }, forwardedRef) => (
  <Item asChild {...props} ref={forwardedRef}>
    <li className='dropdown-item'>
      <span>{children}</span>
    </li>
  </Item>
))
