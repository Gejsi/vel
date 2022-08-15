import type { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='container mx-auto min-h-screen flex flex-col'>
    <h1>In aside layout</h1>
    <main className='flex-1 p-2'>{children}</main>
  </div>
)

export default Layout
