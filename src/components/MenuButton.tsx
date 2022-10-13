import { useAtom } from 'jotai'
import { MdMenu } from 'react-icons/md'
import { sidebarAtom } from './Sidebar'

const MenuButton = () => {
  const [, setSidebarOpen] = useAtom(sidebarAtom)

  return (
    <label
      tabIndex={0}
      htmlFor='sidebar'
      className='btn-icon lg:hidden'
      onClick={() => setSidebarOpen(true)}
    >
      <MdMenu className='h-6 w-6' />
    </label>
  )
}

export default MenuButton
