import { clsx } from 'clsx'
import { useAtom } from 'jotai'
import { twMerge } from 'tailwind-merge'
import { editorAtom, toolbarForcedAtom } from './SmallEditor'

const IconButton = ({ name, ...rest }: { name: string; [x: string]: any }) => {
  // forcefully re-render button to get the latest editor ref
  useAtom(toolbarForcedAtom)
  const [editor] = useAtom(editorAtom)

  return (
    <button
      disabled={!editor}
      className={twMerge(
        'btn-icon',
        clsx({
          'btn-active': editor?.isActive(name),
        })
      )}
      {...rest}
    />
  )
}

export default IconButton
