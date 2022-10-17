import { InfoTipText, LineBoxWrap } from '@pages/Notice/StyleObj'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { MSG } from '@constants/MessageCode/msg'
import BaseTextField from '@components/TextField'
import React, { useCallback, useEffect, useState } from 'react'
import useNoticeStore from '@stores/Commerce/Notice/notice.store'
import Radio from '@components/Radio'
import FormControlLabel from '@components/FormControlLabel'
import { FormGroup } from '@mui/material'
import RadioGroup from '@components/Radio/RadioGroup'
import EditorQuill from '@components/WYSIWYG/Quill/EditorQuill'
import Typography from '@components/Typography'

type NoticeDataLayerProps = {
  pageType: 'update' | 'create' | 'detail'
}

const fieldDisableCheck = (pageType: string, status: boolean) => {
  let disableStatus = false
  switch (pageType) {
    case 'create':
      disableStatus = true
      break
    case 'update':
      disableStatus = !status
      break
    default:
      disableStatus = true
  }
  return disableStatus
}

function NoticeDataLayer(props: NoticeDataLayerProps) {
  const { pageType } = props
  const [dataInput, setDataInput] = useNoticeStore((state) => [
    state.noticeInputDataSet,
    state.setNoticeInputDataSet,
  ])
  const [quillValue, setQuillValue] = useState('')
  const titleInputOnChange = useCallback(
    (value: string) => {
      setDataInput({
        title: value,
      })
    },
    [setDataInput]
  )

  const contentInputOnChange = useCallback((value: string) => {
    setQuillValue(value)
  }, [])

  // editor 내용 store 저장
  useEffect(() => {
    setDataInput({
      content: quillValue,
    })
  }, [quillValue, setDataInput])

  // useNoticeStore.subscribe(
  //   (state) => state.isUpdate,
  //   (paw, previousPaw) => console.log(paw, previousPaw, 3333)
  // )

  // disable 체크
  const inputDisableStatus = fieldDisableCheck(
    pageType,
    useNoticeStore.getState().isUpdate
  )
  // 노출 여부
  const [selectedValue, setSelectedValue] = useState<boolean>(
    dataInput.published
  )

  useEffect(() => {
    setSelectedValue(dataInput?.published)
  }, [dataInput?.published])

  const handlePublishedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkStatus = (event.target as HTMLInputElement).value === 'true'
    setSelectedValue(checkStatus)
    setDataInput({
      published: checkStatus,
    })
  }

  return (
    <FormGroup>
      {pageType === 'create' ? (
        <InfoTipText>
          <InfoOutlinedIcon fontSize={'small'} sx={{ color: '#0288D1' }} />
          <Typography
            variant={'body2'}
            sx={{
              marginLeft: 1,
              color: 'background: rgba(0, 0, 0, 0.6)',
            }}
          >
            {MSG.INFO.CREATE_NOTICE_CODE}
          </Typography>
        </InfoTipText>
      ) : null}
      <LineBoxWrap>
        <div className={'id-area'}>
          <Typography variant={'subtitle2'} sx={{ marginTop: '32px' }}>
            ID
          </Typography>
          <BaseTextField
            data-cy={'name'}
            size={'small'}
            value={dataInput.id ?? ''}
            disabled
            placeholder={'해당 공지 저장 시 자동 생성됩니다.'}
            sx={{ width: '376px', marginTop: '12px' }}
          />
        </div>
        <div className={'published-area'}>
          <Typography variant={'subtitle2'} sx={{ marginTop: '32px' }}>
            노출 상태 설정
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={selectedValue}
            onChange={handlePublishedChange}
          >
            <FormControlLabel
              control={<Radio value={false} size={'small'} />}
              label={'미노출'}
              value={false}
              disabled={inputDisableStatus}
              labelPlacement={'end'}
            />
            <FormControlLabel
              control={<Radio value={true} size={'small'} />}
              label={'노출'}
              value={true}
              disabled={inputDisableStatus}
              labelPlacement={'end'}
              sx={{ pr: 3.75 }}
            />
          </RadioGroup>
        </div>
      </LineBoxWrap>
      <Typography variant={'subtitle2'} sx={{ marginTop: '32px' }}>
        공지 제목
      </Typography>
      <BaseTextField
        placeholder={'공지 제목을 입력해 주세요. 최대 40자 입력할 수 있습니다.'}
        data-cy={'title'}
        value={dataInput.title}
        disabled={pageType === 'detail'}
        size={'small'}
        onChange={(e) => {
          titleInputOnChange(e.currentTarget.value)
        }}
        inputProps={{ maxLength: 40, tabIndex: 1 }}
        fullWidth={true}
        sx={{ marginTop: '12px' }}
      />
      <Typography variant={'subtitle2'} sx={{ marginTop: '32px' }}>
        공지 내용
      </Typography>
      <div
        style={{
          marginTop: '12px',
        }}
      >
        <EditorQuill
          editorValueChange={contentInputOnChange}
          defaultEditorValue={dataInput.content}
          height={'300px'}
          disable={pageType === 'detail'}
        />
      </div>
    </FormGroup>
  )
}

export default NoticeDataLayer
