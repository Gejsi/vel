import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <main className='min-h-screen drawer drawer-mobile'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      {/* pt-0 added because Toolbar has pt-4 */}
      <section className='drawer-content px-4 lg:px-10 py-4 pt-0' role='group'>
        {children}
      </section>
      <Sidebar session={session} />
    </main>
  )
}

export default Layout
