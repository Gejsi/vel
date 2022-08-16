import { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='min-h-screen drawer drawer-mobile'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      <section className='drawer-content bg-secondary/10 p-4' role='group'>
        <label htmlFor='sidebar' className='btn btn-square lg:hidden'>
          <MdMenu className='w-6 h-6' />
        </label>
        <div>{children}</div>
      </section>
      <aside className='drawer-side'>
        <label htmlFor='sidebar' className='drawer-overlay' />
        <ul className='menu p-4 overflow-y-auto w-64 bg-base-100 text-base-content'>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </aside>
    </main>
  )
}

export default Layout
