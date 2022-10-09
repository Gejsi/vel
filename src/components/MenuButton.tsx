import { useAtom } from 'jotai'
import { MdMenu } from 'react-icons/md'
import { sidebarAtom } from './Sidebar'

const MenuButton = () => {
  const [, setSidebar] = useAtom(sidebarAtom)

  return (
    <label
      tabIndex={0}
      htmlFor='sidebar'
      className='btn-icon lg:hidden'
      onClick={() => setSidebar(true)}
    >
      <MdMenu className='h-6 w-6' />
    </label>
  )
}

export default MenuButton
