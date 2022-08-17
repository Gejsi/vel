import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { MdLogout } from 'react-icons/md'

const Sidebar = ({ session }: { session: Session | null }) => (
  <aside className='drawer-side'>
    <label htmlFor='sidebar' className='drawer-overlay' />
    <ul className='menu p-4 overflow-y-auto w-64 bg-base-100'>
      <nav className='flex flex-col items-center mb-4'>
        <Link href='/'>
          <a>
            <h1 className='text-5xl font-bold'>Vel</h1>
          </a>
        </Link>
        <div className='divider'></div>
        <div className='flex items-center gap-2 w-full px-4'>
          <img className='w-10 rounded-full' src={session?.user?.image!} />
          <span className='flex-1'>{session?.user?.name}</span>
          <div className='tooltip tooltip-bottom' data-tip='Logout'>
            <button
              className='btn btn-square btn-ghost'
              onClick={() => signOut()}
            >
              <MdLogout className='w-6 h-6' />
            </button>
          </div>
        </div>
      </nav>
      <li>
        <span>Hello</span>
      </li>
      <li>
        <span>Hello</span>
      </li>
    </ul>
  </aside>
)

export default Sidebar
