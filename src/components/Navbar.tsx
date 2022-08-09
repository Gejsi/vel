import { Maybe } from '@trpc/server'
import type { Session } from 'next-auth'
import { signIn } from 'next-auth/react'

const Navbar = ({ session }: { session: Maybe<Session> }) => {
  return (
    <div className='navbar bg-base-200'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>Vel</a>
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
              <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img src={session.user?.image!} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
              >
                <li>
                  <a className='justify-between'>
                    Profile
                    <span className='badge'>New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
