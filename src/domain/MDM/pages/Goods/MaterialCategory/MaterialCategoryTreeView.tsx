import TreeView from '@src/components/TreeView/TreeView'
import React, { useEffect } from 'react'
import { useQueryWrap } from '@queries/useQuery'
import Instance from '@api/Instance'
import {
  CategoryListRes,
  MaterialCategoryKey,
  MaterialRenderTree,
} from './Props'
import { CATEGORY_API_PATH } from '@src/api/path/MDM/categoryPath'
import { useCategoryStore } from '@stores/category.store'

function MaterialCategoryTreeView() {
  const [categoryList, setCategoryList] = useCategoryStore((state) => [
    state.categoryList,
    state.setCategoryList,
  ])

  const { data } = useQueryWrap<CategoryListRes>(MaterialCategoryKey.list, () =>
    Instance.get(CATEGORY_API_PATH.MATERIAL_CATEGORY_LIST)
  )

  const buttonList = ['군 추가', 'Ph1 추가', 'Ph2 추가', 'Ph3 추가']

  useEffect(() => {
    setCategoryList(data?.items as MaterialRenderTree[])
  }, [data?.items])

  return (
    <TreeView
      treeList={categoryList}
      setTreeList={setCategoryList}
      buttonList={buttonList}
    />
  )
}

export default MaterialCategoryTreeView
