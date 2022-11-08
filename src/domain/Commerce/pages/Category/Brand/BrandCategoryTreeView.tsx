import TreeView from '@src/components/TreeView/TreeView'
import React, { useEffect } from 'react'
import { useCategoryStore } from '@stores/category.store'
import { useQueryWrap } from '@queries/useQuery'
import {
  BrandCategoryKey,
  BrandRenderTree,
  Status,
} from '@domain/Commerce/pages/Category/Brand/Props'
import Instance from '@api/Instance'
import { CATEGORY_API_PATH } from '@api/path/Commerce/categoryPath'

function BrandCategoryTreeView() {
  const [categoryList, setCategoryList] = useCategoryStore((state) => [
    state.categoryList,
    state.setCategoryList,
  ])

  const { data } = useQueryWrap<BrandRenderTree[]>(BrandCategoryKey.list, () =>
    Instance.get(CATEGORY_API_PATH.BRAND_CATEGORY)
  )

  const buttonList = ['브랜드 추가', '하위 분류 추가']

  useEffect(() => {
    data?.map((d) => {
      d.subCategories?.map((f) => (f.stringId = f.id + ''))
      d.stringId = d.id + ''
      d.status === Status.disabled ? (d.disabled = true) : (d.disabled = false)
      d.subCategories?.map((f) =>
        f.status === Status.disabled
          ? (f.disabled = true)
          : (f.disabled = false)
      )
    })

    setCategoryList(data as BrandRenderTree[])
  }, [data])

  return (
    <TreeView
      treeList={categoryList}
      setTreeList={setCategoryList}
      buttonList={buttonList}
    />
  )
}

export default BrandCategoryTreeView
