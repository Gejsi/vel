import type { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'

const ToolbarWithIcons = ({ children }: { children?: ReactNode }) => (
  <nav className='border-b-solid sticky top-0 z-10 mb-4 border-b-2 border-b-base-content/10 bg-base-100 pt-4'>
    <div className='mb-6 flex items-center gap-4'>
      <label
        tabIndex={0}
        htmlFor='sidebar'
        className='btn btn-ghost btn-square lg:hidden'
      >
        <MdMenu className='h-6 w-6' />
      </label>
      {children}
    </div>
  </nav>
)

export default ToolbarWithIcons
