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
  <nav className='flex flex-col items-center'>
    <Link href='/'>
      <a>
        <h1 className='text-5xl font-bold'>Vel</h1>
      </a>
    </Link>
    <div className='divider mb-0' />
    <div className='flex w-full items-center gap-2'>
      <li className='flex-1'>
        <Link href='/me'>
          <a className=''>
            <img className='w-7 rounded-full' src={session?.user?.image!} />
            <span>{session?.user?.name}</span>
          </a>
        </Link>
      </li>
      <div className='tooltip' data-tip='Logout'>
        <button className='btn btn-ghost btn-square' onClick={() => signOut()}>
          <MdLogout className='h-6 w-6' />
        </button>
      </div>
    </div>
  </nav>
)

const Sidebar = ({ session }: { session: Session | null }) => (
  <aside className='drawer-side'>
    <label htmlFor='sidebar' className='drawer-overlay' />
    <ul className='menu w-64 space-y-2 overflow-y-auto bg-base-200 p-4'>
      <Sidenav session={session} />
      <button className='btn gap-2'>
        <MdKeyboard className='h-6 w-6' />
        Open Commands
      </button>
      <div className='divider' />
      <li>
        <Link href='/decks'>
          <a>
            <MdDashboard className='h-6 w-6' />
            Decks
          </a>
        </Link>
      </li>
      <li>
        <Link href='/question'>
          <a>
            <MdToday className='h-6 w-6' />
            Today's question
          </a>
        </Link>
      </li>
      <li>
        <Link href='/settings'>
          <a>
            <MdSettings className='h-6 w-6' />
            Settings
          </a>
        </Link>
      </li>
      <li>
        <button>
          <BiCommand className='h-5 w-5' />
          Shortcuts
        </button>
      </li>
    </ul>
  </aside>
)

export default Sidebar
