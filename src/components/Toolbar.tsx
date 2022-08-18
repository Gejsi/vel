import type { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'

const Toolbar = ({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) => (
  <nav className='sticky top-0 z-10 bg-base-100 pt-4'>
    <div className='flex items-center gap-6 sticky top-0'>
      <label
        tabIndex={0}
        htmlFor='sidebar'
        className='btn btn-square lg:hidden'
      >
        <MdMenu className='w-6 h-6' />
      </label>
      <h1 className='flex-1 text-2xl md:text-5xl'>{title}</h1>
      {children}
    </div>
    <div className='divider' />
  </nav>
)

export default Toolbar
