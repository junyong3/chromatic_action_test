export type initFormValue = {
  isUpdate: string
  updateCell: any
  targetColumn: any
}
export type BatchModalRefProps = {
  open: () => void
}
export type fieldTypeUnion =
  | 'text'
  | 'number'
  | 'switch'
  | 'radio'
  | 'checkbox'
  | 'select'

export type fieldPropsUnion =
  | {
      inputField: 'text'
    }
  | {
      inputField: 'number'
    }
  | {
      inputField: 'radio'
      defaultValue: string | boolean
      options: any[]
    }
  | {
      inputField: 'select'
      defaultValue: string
      options: any[]
    }
  | {
      inputField: 'checkbox'
      defaultValue: string | boolean
      options: any[]
    }
  | {
      inputField: 'switch'
      defaultValue: boolean
      label: string
    }
export type updateColTS = {
  value: string
  label: string
  fieldProps: fieldPropsUnion
}
export type BatchUpdateAndDeleteDataGridProps<T> = {
  title?: string
  rowId: string
  columnList: Array<T>
  updateColumnList: Array<updateColTS>
  gridDataSet: Array<T>
}
