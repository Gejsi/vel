import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <main className='drawer drawer-mobile min-h-screen'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      {/* pt-0 added because Toolbar has pt-4 */}
      <section className='drawer-content px-4 py-4 pt-0 lg:px-10' role='group'>
        {children}
      </section>
      <Sidebar session={session} />
    </main>
  )
}

export default Layout
