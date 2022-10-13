import { atom, useAtom } from 'jotai'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
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
          <a>
            <img
              className='w-7 rounded-full'
              src={session?.user?.image || undefined}
              alt='Avatar'
            />
            <p className='max-w-[10ch] truncate'>{session?.user?.name}</p>
          </a>
        </Link>
      </li>
      <div className='tooltip' data-tip='Logout'>
        <button className='btn-icon' onClick={() => signOut()}>
          <MdLogout className='h-6 w-6' />
        </button>
      </div>
    </div>
  </nav>
)

export const sidebarAtom = atom(false)

const Sidebar = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const [, setSidebarOpen] = useAtom(sidebarAtom)

  // close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [router.asPath, setSidebarOpen])

  return (
    <aside className='drawer-side'>
      <label
        htmlFor='sidebar'
        className='drawer-overlay'
        onClick={() => setSidebarOpen(false)}
      />
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
}

export default Sidebar
