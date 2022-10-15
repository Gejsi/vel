import {
  Arrow,
  Content,
  Group,
  Item,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu'
import type { ComponentProps, ReactNode } from 'react'

export const Dropdown = Root

export const DropdownTrigger = (props: ComponentProps<typeof Trigger>) => (
  <Trigger asChild {...props} />
)

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

export const DropdownItem = (props: ComponentProps<typeof Item>) => (
  <Item asChild {...props}>
    <li className='dropdown-item'>
      <span>{props.children}</span>
    </li>
  </Item>
)
