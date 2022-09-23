import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession({ required: true })

  return (
    <div className='drawer-mobile drawer min-h-screen'>
      <input id='sidebar' type='checkbox' className='drawer-toggle' />
      <main className='drawer-content pb-8'>{children}</main>
      <Sidebar session={session} />
      <Toaster position='bottom-right' toastOptions={{}}>
        {(t) => (
          <div className='toast'>
            <div
              className={`alert glass ${
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
