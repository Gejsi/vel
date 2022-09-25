import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className='navbar bg-base-200'>
      <div className='flex-1'>
        <Link href='/'>
          <a className='btn btn-ghost text-xl normal-case'>Vel</a>
        </Link>
      </div>
      <div className='flex-none gap-2'>
        {status === 'authenticated' ? (
          <>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Search'
                className='input input-bordered'
              />
            </div>
            <div className='dropdown-end dropdown'>
              <label tabIndex={0} className='avatar btn btn-ghost btn-circle'>
                <div className='w-10 rounded-full'>
                  <img src={session.user?.image || undefined} alt='Avatar' />
                </div>
              </label>
              <ul className='dropdown-content menu rounded-box menu-compact mt-2 space-y-2 border-2 border-solid border-primary p-2'>
                <li>
                  <Link href='/me'>
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href='/decks'>
                    <a>Decks</a>
                  </Link>
                </li>
                <li>
                  <Link href='/settings'>
                    <a>Settings</a>
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : status === 'unauthenticated' ? (
          <button className='btn' onClick={() => signIn()}>
            Sign in
          </button>
        ) : null}
      </div>
    </nav>
  )
}

export default Navbar
