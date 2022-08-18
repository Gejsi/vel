import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const HomeLayout = ({ children }: { children: ReactNode }) => (
  <div className='container mx-auto min-h-screen flex flex-col'>
    <Navbar />
    <main className='flex flex-1 p-2'>{children}</main>
    <Footer />
  </div>
)

export default HomeLayout
