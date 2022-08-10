import { Maybe } from '@trpc/server'
import type { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Navbar = ({ session }: { session: Maybe<Session> }) => {
  return (
    <div className='navbar bg-base-200'>
      <div className='flex-1'>
        <Link href='/'>
          <a className='btn btn-ghost normal-case text-xl'>Vel</a>
        </Link>
      </div>
      <div className='flex-none gap-2'>
        {session ? (
          <>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Search'
                className='input input-bordered'
              />
            </div>
            <div className='dropdown dropdown-end'>
              <button className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src={session.user?.image!} />
                </div>
              </button>
              <ul className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'>
                <li>
                  <button>Profile</button>
                </li>
                <li>
                  <button>Settings</button>
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button className='btn' onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
