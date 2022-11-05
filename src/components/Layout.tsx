import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Sidebar, { sidebarAtom } from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })
  const [sidebarState] = useAtom(sidebarAtom)

  return (
    <div className='drawer-mobile drawer min-h-screen'>
      <input
        id='sidebar'
        type='checkbox'
        className='drawer-toggle'
        checked={sidebarState}
        readOnly
      />
      <main className='drawer-content p-4 pt-0 lg:p-8 lg:pt-0'>{children}</main>
      <Sidebar session={session} />
      <Toaster
        position='bottom-right'
        containerClassName='!inset-4 md:!inset-8'
        gutter={16}
        toastOptions={{ className: 'notification' }}
      />
    </div>
  )
}

export default Layout
