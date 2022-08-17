import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <nav className='navbar bg-base-200'>
      <div className='flex-1'>
        <Link href='/'>
          <a className='btn btn-ghost normal-case text-xl'>Vel</a>
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
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src={session.user?.image!} />
                </div>
              </label>
              <ul className='mt-2 p-2 border-2 border-solid border-primary menu menu-compact dropdown-content rounded-box space-y-2'>
                <li>
                  <Link href='/me'>
                    <a>Profile</a>
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
