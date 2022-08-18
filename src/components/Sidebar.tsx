import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { BiCommand } from 'react-icons/bi'
import {
  MdDashboard,
  MdKeyboard,
  MdLogout,
  MdSettings,
  MdToday,
} from 'react-icons/md'

const Sidenav = ({ session }: { session: Session | null }) => (
  <nav className='flex flex-col items-center mb-4'>
    <Link href='/'>
      <a>
        <h1 className='text-5xl font-bold'>Vel</h1>
      </a>
    </Link>
    <div className='divider' />
    <div className='flex items-center w-full gap-2'>
      <li className='flex-1'>
        <Link href='/me'>
          <a className=''>
            <img className='w-7 rounded-full' src={session?.user?.image!} />
            <span>{session?.user?.name}</span>
          </a>
        </Link>
      </li>
      <div className='tooltip' data-tip='Logout'>
        <button className='btn btn-square btn-ghost' onClick={() => signOut()}>
          <MdLogout className='w-6 h-6' />
        </button>
      </div>
    </div>
  </nav>
)

const Sidebar = ({ session }: { session: Session | null }) => (
  <aside className='drawer-side'>
    <label htmlFor='sidebar' className='drawer-overlay' />
    <ul className='menu p-4 overflow-y-auto w-64 bg-base-100 border-r-2 border-base-content/10'>
      <Sidenav session={session} />
      <button className='btn gap-2'>
        <BiCommand className='w-5 h-5' />
        Open Commands
      </button>
      <div className='divider' />
      <li>
        <Link href='/decks'>
          <a>
            <MdDashboard className='w-6 h-6' />
            Decks
          </a>
        </Link>
      </li>
      <li>
        <Link href='/question'>
          <a>
            <MdToday className='w-6 h-6' />
            Today's question
          </a>
        </Link>
      </li>
      <li>
        <Link href='/settings'>
          <a>
            <MdSettings className='w-6 h-6' />
            Settings
          </a>
        </Link>
      </li>
      <li>
        <button>
          <MdKeyboard className='w-6 h-6' />
          Shortcuts
        </button>
      </li>
    </ul>
  </aside>
)

export default Sidebar
