import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <main className='min-h-screen drawer drawer-mobile'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      <section className='drawer-content p-4' role='group'>
        <label htmlFor='sidebar' className='btn btn-square lg:hidden'>
          <MdMenu className='w-6 h-6' />
        </label>
        <div>{children}</div>
      </section>
      <Sidebar session={session} />
    </main>
  )
}

export default Layout
