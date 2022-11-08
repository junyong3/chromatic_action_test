import { TreeViewProps as MuiTreeViewProps } from '@mui/lab'

// eslint-disable-next-line @typescript-eslint/ban-types
type addTreeViewProps = {}
export type BaseTreeViewProps = MuiTreeViewProps & addTreeViewProps

export enum ORDER {
  PREV = -1,
  NEXT = 1,
}

export interface TreeViewProps {
  treeList: any[]
  setTreeList: (treeList: any[]) => void
  buttonList: string[]
}
