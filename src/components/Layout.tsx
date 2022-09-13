import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <div className='drawer-mobile drawer min-h-screen'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      <main className='drawer-content pb-8'>{children}</main>
      <Sidebar session={session} />
    </div>
  )
}

export default Layout
