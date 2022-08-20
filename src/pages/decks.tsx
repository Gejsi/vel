import Head from 'next/head'
import { MdAdd } from 'react-icons/md'
import Toolbar from '../components/Toolbar'
import useModal from '../hooks/use-modal'
import type { NextPageWithLayout } from './_app'

const Decks: NextPageWithLayout = () => {
  const { openModal, closeModal, Modal } = useModal()

  return (
    <>
      <Head>
        <title>Vel | Decks</title>
      </Head>

      <Toolbar title='Decks'>
        <button className='btn gap-2' onClick={openModal}>
          <MdAdd className='w-6 h-6' />
          Create deck
        </button>
      </Toolbar>

      <Modal>
        <h3 className='font-bold text-lg'>
          Congratulations random Internet user!
        </h3>
        <p className='py-4 bg-sky-50'>
          You've been selected for a chance to get one year of subscription to
          use Wikipedia for free! hit ESC or click outside of me.
        </p>
        <div className='modal-action'>
          <button className='btn btn-ghost' onClick={closeModal}>
            Close me!
          </button>
        </div>
      </Modal>

      <p>Content</p>
      <div className='w-80 h-80 bg-primary' />
    </>
  )
}

export default Decks
