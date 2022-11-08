import FormModal from '@components/Modal/FormModal'
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { useBatchContentActions } from './hooks/useBatchContentActions'
import { GridValidRowModel } from '@mui/x-data-grid'
import useBatchModal from '@stores/MDM/batchModal.store'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import {
  BatchModalRefProps,
  BatchUpdateAndDeleteDataGridProps,
  initFormValue,
} from './Props'

const BatchCallDataGridModal = forwardRef(
  <T extends GridValidRowModel>(
    props: BatchUpdateAndDeleteDataGridProps<T>,
    ref: Ref<BatchModalRefProps>
  ) => {
    const { title, gridDataSet, columnList, updateColumnList, rowId } = props
    const [selectionIds, isOpenSave, setIsOpenSave] = useBatchModal((state) => [
      state.selectionIds,
      state.isOpenSave,
      state.setIsOpenSave,
    ])
    const [isBatchModal, setIsBatchModal] = useState<boolean>(false)
    useImperativeHandle(ref, () => ({
      open: () => setIsBatchModal(true),
    }))
    const initDefValue = {
      isUpdate: 'delete',
      updateCell: null,
      targetColumn: updateColumnList[0].value,
    }
    const methods = useForm<initFormValue>({
      mode: 'onBlur',
      defaultValues: initDefValue,
    })
    const { isDirty } = useFormState({
      name: 'updateCell',
      control: methods.control,
    })
    const onSubmit = methods.handleSubmit((inputData) => {
      // id 값으로 추출
      const selectedDataSet = selectionIds.reduce((prev, curv) => {
        const findData = gridDataSet.find((d) => d[rowId] === curv) as Record<
          string,
          unknown
        >

        if (findData) {
          // 타겟 컬럼 값 수정
          if (inputData.isUpdate === 'update') {
            // column 필드 확인
            if (inputData.targetColumn in findData && isDirty) {
              findData[inputData.targetColumn] = inputData.updateCell
            } else {
              console.error('target Column Not Found | Not Input Data')
              return prev
            }
          }
          prev.push(findData)
          return prev
        }
        return prev
      }, [] as any)
      // setKeyword(inputData.keyword)
      if (inputData.isUpdate === 'update') {
        console.log(selectedDataSet)
        // api 호출
      } else {
        // api 호출
        console.log(selectedDataSet)
      }
    })

    const { content, actions } = useBatchContentActions({
      content: {
        rowId,
        gridDataSet,
        columnList,
        updateColumnList,
      },
    })

    const onClickSave = () => {
      void onSubmit()
    }

    return (
      <FormModal
        handleExited={() => {
          useBatchModal.getState().reset()
          methods.reset(initDefValue)
        }}
        size={'lg'}
        open={isBatchModal}
        title={`일괄 수정 및 삭제 (${title})`}
        onClose={() => setIsBatchModal(false)}
        methods={methods}
        onSubmit={onSubmit}
        content={content}
        actions={actions}
      >
        <Dialog
          size="sm"
          open={isOpenSave}
          title={`일괄 수정 및 삭제 (${methods.getValues('isUpdate')})`}
          onClose={() => setIsOpenSave(false)}
          content={
            selectionIds?.length
              ? `선택된 ${selectionIds?.length}개 row를 저장하시겠습니까?`
              : '선택된 row가 없습니다.'
          }
          actions={
            <>
              <Button onClick={() => setIsOpenSave(false)}>닫기</Button>
              {selectionIds?.length ? (
                <Button data-cy={'dialogSaveButton'} onClick={onClickSave}>
                  저장
                </Button>
              ) : null}
            </>
          }
        />
      </FormModal>
    )
  }
)
BatchCallDataGridModal.displayName = 'BatchCallDataGridModal'
export default BatchCallDataGridModal
