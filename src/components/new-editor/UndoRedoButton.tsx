import { useAtom } from 'jotai'
import { editorAtom, toolbarForcedAtom } from './SmallEditor'

const UndoRedoButton = ({
  name,
  ...rest
}: {
  name?: 'undo' | 'redo'
  [x: string]: any
}) => {
  // forcefully re-render button to get the latest editor ref
  useAtom(toolbarForcedAtom)
  const [editor] = useAtom(editorAtom)

  return (
    <button
      disabled={
        !editor ||
        (name === 'undo'
          ? !editor?.can().chain().focus().undo().run()
          : !editor?.can().chain().focus().redo().run())
      }
      className='btn-icon'
      {...rest}
    />
  )
}

export default UndoRedoButton
