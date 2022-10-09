import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast'
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
      />
      <main className='drawer-content pb-14'>{children}</main>
      <Sidebar session={session} />
      <Toaster position='bottom-right'>
        {(t) => (
          <div className='toast'>
            <div
              className={`glassy alert ${
                t.visible ? 'animate-slideUp' : 'animate-slideDown'
              }`}
            >
              <ToastIcon toast={t} />
              <p>{resolveValue(t.message, t)}</p>
            </div>
          </div>
        )}
      </Toaster>
    </div>
  )
}

export default Layout
