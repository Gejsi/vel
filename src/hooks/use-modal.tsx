import { useCallback, type ReactNode } from 'react'
import usePortal from 'react-useportal'

type TPortal = {
  openPortal: () => void
  closePortal: () => void
  isOpen: boolean
  Portal: any
}

const useModal = () => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal({
    onOpen({ portal }) {
      portal.current.classList.remove('animate-fadeOut')
      portal.current.classList.add(
        'modal',
        'modal-open',
        'modal-bottom',
        'sm:modal-middle',
        'z-50',
        'animate-fadeIn'
      )
    },
    onClose({ portal }) {
      portal.current.classList.remove('animate-fadeIn')
      portal.current.classList.add('animate-fadeOut')

      // close modal after fadeOut transition
      const timeoutId = setTimeout(
        () => portal.current.classList.remove('modal-open'),
        300 // hard-coded, check durations in `tailwind.config.cjs`
      )

      return () => clearTimeout(timeoutId)
    },
  }) as TPortal

  const Modal = useCallback(
    ({ children }: { children: ReactNode }) =>
      isOpen ? (
        <Portal>
          <div className='modal-box z-[101]'>{children}</div>
          {/*
           * hacky way to get a "click on the overlay to close modal" action,
           * because the approach of daisyUI isn't great
           */}
          <div className='modal modal-open z-[100]' onClick={closePortal} />
        </Portal>
      ) : null,
    [isOpen]
  )

  return {
    Modal,
    openModal: openPortal,
    closeModal: closePortal,
    isOpen,
  }
}

export default useModal
