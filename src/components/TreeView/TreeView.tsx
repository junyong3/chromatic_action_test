import BaseTreeView from '@components/TreeView/BaseTreeView'
import React, { useEffect, useState } from 'react'
import { TreeItem } from '@mui/lab'
import { useCategoryStore } from '@stores/category.store'
import { ORDER, TreeViewProps } from './Props'
import ButtonGroup from '@components/ButtonGroup'
import Button from '@components/Button'
import { useFormContext } from 'react-hook-form'
import { Dialog } from '@components/Dialog'
import {
  ProductRenderTree,
  Status,
} from '@src/domain/Commerce/pages/Category/Product/Props'

function TreeView({ treeList = [], setTreeList, buttonList }: TreeViewProps) {
  const [
    setIsMainCategory,
    selectedNodeId,
    setSelectedNodeId,
    setSelectedNode,
  ] = useCategoryStore((state) => [
    state.setIsMainCategory,
    state.selectedNodeId,
    state.setSelectedNodeId,
    state.setSelectedNode,
  ])

  const [isConfirmDialog, setIsConfirmDialog] = useState<boolean>(false)
  const [tempId, setTempId] = useState<string>('')
  const { formState } = useFormContext()

  const onNodeSelect = (event: React.SyntheticEvent, nodeId: string) => {
    if (formState.isDirty) {
      setIsConfirmDialog(true)
      setTempId(nodeId)
    } else {
      setSelectedNodeId(nodeId)
    }
  }

  const categoryChangeOrder = (treeList: any[], order: ORDER) => {
    const idx = treeList.findIndex((d) => d.stringId === selectedNodeId)

    if (idx === -1) {
      treeList.forEach((d) => {
        categoryChangeOrder(d.subCategories, order)
      })
    } else {
      if (idx === 0 && order === ORDER.PREV) return treeList

      const item = treeList.splice(idx, 1)
      treeList.splice(idx + order, 0, item[0])
    }

    return treeList
  }

  const createCategory = (renderTree: any) => {
    const id = Math.floor(Math.random() * 100000)
    const stringId = id + ''

    renderTree.push({
      id: id,
      stringId: stringId,
      name: '새 카테고리',
      imageUrl: '',
      status: Status.disabled,
      type: 'new',
      subCategories: [],
    } as unknown as ProductRenderTree)

    setSelectedNodeId(stringId)
  }

  const addChildrenCategory = (
    list: any[],
    searchDepth: number,
    currentDepth: number
  ) => {
    const idx = list.findIndex((d) => d.stringId === selectedNodeId)

    if (idx === -1) {
      if (!selectedNodeId && currentDepth === 1) {
        createCategory(list)
      } else {
        list.forEach((d) => {
          addChildrenCategory(d.subCategories, searchDepth + 1, currentDepth)
        })
      }
    } else {
      if (searchDepth === currentDepth) {
        createCategory(list)
      } else if (searchDepth + 1 === currentDepth) {
        createCategory(list[idx].subCategories ?? [])
      }
    }
  }

  const onSelectedNodeId = (list: any[]) => {
    const find = list.find((d) => d.stringId === selectedNodeId)
    if (find) {
      setSelectedNode(find)
    } else {
      list.forEach((d) => {
        onSelectedNodeId(d.subCategories ?? [])
      })
    }
  }

  useEffect(() => {
    setIsMainCategory(
      treeList.findIndex((d) => d.stringId === selectedNodeId) > -1
    )
    onSelectedNodeId(treeList)
  }, [selectedNodeId])

  const onClickUp = () => {
    if (!selectedNodeId) return

    setTreeList([...categoryChangeOrder(treeList, ORDER.PREV)])
  }

  const onClickDown = () => {
    if (!selectedNodeId) return

    setTreeList([...categoryChangeOrder(treeList, ORDER.NEXT)])
  }

  const onClickAddSubCategory = (currentDepth: number) => {
    addChildrenCategory(treeList, 1, currentDepth)

    setTreeList([...treeList])
  }

  const renderTree = (nodes: any) => (
    <TreeItem
      key={nodes.stringId}
      nodeId={nodes.stringId}
      label={nodes.name}
      sx={
        nodes.disabled
          ? {
              opacity: 0.38,
              backgroundColor: 'transparent',
            }
          : null
      }
    >
      {Array.isArray(nodes.subCategories)
        ? nodes.subCategories.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  )

  return (
    <>
      <BaseTreeView onNodeSelect={onNodeSelect} selected={selectedNodeId}>
        {treeList.map((d: any) => renderTree(d))}
      </BaseTreeView>
      <ButtonGroup size={'small'} variant={'contained'}>
        <Button onClick={onClickUp} disabled={!selectedNodeId}>
          ↑
        </Button>
        <Button onClick={onClickDown} disabled={!selectedNodeId}>
          ↓
        </Button>
        {buttonList.map((text, idx) => (
          <Button
            key={idx}
            onClick={() => onClickAddSubCategory(idx + 1)}
            style={{ flex: 1 }}
            disabled={idx === 0 ? false : !selectedNodeId}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>

      <Dialog
        size={'sm'}
        open={isConfirmDialog}
        title={'확인'}
        onClose={() => setIsConfirmDialog(false)}
        content={
          <>다른 카테고리 정보로 이동하기 전, [저장] 버튼을 눌러주세요.</>
        }
        actions={
          <>
            <Button
              onClick={() => {
                setIsConfirmDialog(false)
                setSelectedNodeId(tempId)
              }}
            >
              무시
            </Button>
            <Button
              data-cy={'dialogSaveButton'}
              onClick={() => setIsConfirmDialog(false)}
            >
              닫기
            </Button>
          </>
        }
      />
    </>
  )
}

export default TreeView
