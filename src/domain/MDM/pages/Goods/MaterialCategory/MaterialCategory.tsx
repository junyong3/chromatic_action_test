import { useMutationWrap2 } from '@queries/useMutation'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { queryClient } from '@queries/client'
import { To } from '@routes/To'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { Grid } from '@mui/material'
import { Dialog } from '@components/Dialog'
import Button from '@components/Button'
import {
  MaterialCategoryDto,
  MaterialCategoryKey,
} from '@domain/MDM/pages/Goods/MaterialCategory/Props'
import MaterialCategoryTreeView from './MaterialCategoryTreeView'
import CategoryCode from '@domain/MDM/pages/Goods/MaterialCategory/InputData/CategoryCode'
import { useCategoryStore } from '@stores/category.store'
import CategoryName from './InputData/CategoryName'
import { materialCategoryUpdate } from '@domain/MDM/pages/Goods/MaterialCategory/query'

function MaterialCategory() {
  const { mutate: update } = useMutationWrap2<MaterialCategoryDto>(
    materialCategoryUpdate
  )
  const navigate = useNavigate()
  const [isOpenSaveDialog, setIsOpenSaveDialog] = useState<boolean>(false)
  const [isDeleteDialog, setIsDeleteDialog] = useState<boolean>(false)
  const [selectedNodeId, selectedNode] = useCategoryStore((state) => [
    state.selectedNodeId,
    state.selectedNode,
  ])

  const methods = useForm<MaterialCategoryDto>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      code: '',
    },
  })

  const { isValid } = methods.formState

  const onSubmit = methods.handleSubmit((params) => {
    LoadingService.show()
    update(params, {
      onSuccess: () => {
        SnackbarService.show(MSG.SUCCESS.SAVE_CATEGORY)
        void queryClient.invalidateQueries(MaterialCategoryKey.list)
        setIsOpenSaveDialog(false)
        navigate(`${To.MDMGoodsMaterialCategory}`)
      },
      onSettled: () => {
        LoadingService.close()
      },
    })
  })

  useEffect(() => {
    if (selectedNode) {
      methods.reset(selectedNode)

      void methods.trigger(['name', 'code'])
    }
  }, [selectedNode])

  return (
    <Page>
      <SubHeader
        title={'자재 카테고리 관리'}
        deleteButton={{
          onClick: () => setIsDeleteDialog(true),
        }}
        saveButton={{
          onClick: () => setIsOpenSaveDialog(true),
          disabled: !isValid,
        }}
      />

      <FormProvider {...methods}>
        <form id={'materialCategoryForm'} onSubmit={onSubmit}>
          <Grid container columnSpacing={3} py={4}>
            <Grid item xs={6}>
              <MaterialCategoryTreeView />
            </Grid>
            {selectedNodeId ? (
              <Grid item xs={6}>
                <CategoryName />
                <CategoryCode />
              </Grid>
            ) : null}
          </Grid>
        </form>
      </FormProvider>

      <Dialog
        size="sm"
        open={isOpenSaveDialog}
        title="확인"
        onClose={() => setIsOpenSaveDialog(false)}
        content={'설정된 정보로 저장하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsOpenSaveDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogSaveButton'}
              type="submit"
              form="materialCategoryForm"
              onClick={() => setIsOpenSaveDialog(false)}
            >
              저장
            </Button>
          </>
        }
      />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 자재 카테고리를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={() => setIsDeleteDialog(false)}
            >
              자제 카테고리 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default MaterialCategory
