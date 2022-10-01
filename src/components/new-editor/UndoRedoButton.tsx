import { useAtom } from 'jotai'
import { editorAtom, toolbarForcedAtom } from './SmallEditor'

const UndoRedoButton = ({
  name,
  icon,
  ...rest
}: {
  name?: string
  icon?: 'undo' | 'redo'
  [x: string]: any
}) => {
  // forcefully re-render button to get the latest editor ref
  useAtom(toolbarForcedAtom)
  const [editor] = useAtom(editorAtom)

  return (
    <button
      disabled={
        !editor ||
        !editor.isFocused ||
        (icon === 'undo'
          ? !editor?.can().chain().focus().undo().run()
          : !editor?.can().chain().focus().redo().run())
      }
      className='btn-icon'
      {...rest}
    />
  )
}

export default UndoRedoButton
