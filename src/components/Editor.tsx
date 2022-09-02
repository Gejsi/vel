import { Plate, type TEditableProps } from '@udecode/plate'

const editableProps: TEditableProps = {
  placeholder: 'Type...',
  className: 'h-1/2 bg-secondary/20',
}

const Editor = () => <Plate editableProps={editableProps} />

export default Editor
