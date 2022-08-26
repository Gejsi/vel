import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <div className='drawer drawer-mobile min-h-screen'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      {/* pt-0 added because Toolbar has pt-4 */}
      <main className='drawer-content px-4 py-4 pt-0 lg:px-10'>{children}</main>
      <Sidebar session={session} />
    </div>
  )
}

export default Layout
