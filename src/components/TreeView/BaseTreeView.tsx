import { TreeView as MuiTreeView } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { BaseTreeViewProps } from '@components/TreeView/Props'
import { PropsWithChildren } from 'react'

function BaseTreeView(props: PropsWithChildren<BaseTreeViewProps>) {
  const { children, onNodeFocus, onNodeSelect, onNodeToggle, selected } = props
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MuiTreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, overflowY: 'auto', p: 2 }}
      onNodeFocus={onNodeFocus}
      onNodeSelect={onNodeSelect}
      onNodeToggle={onNodeToggle}
      selected={selected}
    >
      {children}
    </MuiTreeView>
  )
}

export default BaseTreeView
