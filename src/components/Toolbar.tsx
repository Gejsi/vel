import type { ReactNode } from 'react'
import MenuButton from './MenuButton'

const Toolbar = ({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) => (
  <nav className='sticky top-0 z-10 mb-4 bg-base-100 px-4 pt-4 lg:px-8'>
    <div className='mb-6 flex items-center gap-4'>
      <MenuButton />
      <h1 className='flex-1 text-2xl font-medium md:text-5xl'>{title}</h1>
      {children}
    </div>
    <div className='divider m-0 h-fit' />
  </nav>
)

export default Toolbar
