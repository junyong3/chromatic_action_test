import { OutlinedInput, SelectChangeEvent } from '@mui/material'
import { StoriesWrap } from '@compositions/StyleObj'
import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'
import { useState } from 'react'
import Checkbox from '../Checkbox'
import FormControl from '../FormControl'
import FormControlLabel from '../FormControlLabel'
import SearchFormItem from '../SearchFormItem'
import Select from '../Select'
import BaseTextField from '../TextField'
import { SearchFormProp } from './Props'
import SearchForm from './SearchForm'
import SearchFormRow from '@components/SearchFormRow'

const Template: Story<SearchFormProp> = (args: SearchFormProp) => {
  const [searchType, setSearchType] = useState('')
  const [searchText, setsearchText] = useState('')
  return (
    <StoriesWrap>
      <SearchForm
        {...args}
        onSearch={action(`[검색] ${searchType} / ${searchText}`)}
      >
        <SearchFormRow>
          <SearchFormItem label="검색어">
            <FormControl sx={{ width: 300 }}>
              <Select
                displayEmpty
                value={searchType}
                input={<OutlinedInput />}
                size="small"
                onChange={(event: SelectChangeEvent<string>) => {
                  setSearchType(event.target.value as string)
                }}
                optionList={[
                  { value: 'option11', label: '가나다라' },
                  { value: 'option12', label: '마바사' },
                  { value: 'option12', label: '아자차카' },
                ]}
                placeholder="선택하세요"
              />
            </FormControl>
            <div style={{ width: '535px' }}>
              <BaseTextField
                hiddenLabel
                type="text"
                value={searchText}
                size="small"
                placeholder="검색어를 입력하세요"
                onChange={(event) => {
                  setsearchText(event.target.value as string)
                }}
                fullWidth
              />
            </div>
          </SearchFormItem>
        </SearchFormRow>

        <SearchFormRow>
          <SearchFormItem label="회원상태">
            <FormControlLabel
              control={<Checkbox size={'medium'} defaultChecked={true} />}
              label={'전체'}
              value={'end'}
              labelPlacement={'end'}
            />
            <FormControlLabel
              control={<Checkbox size={'medium'} defaultChecked={true} />}
              label={'정상'}
              value={'end'}
              labelPlacement={'end'}
            />
            <FormControlLabel
              control={<Checkbox size={'medium'} defaultChecked={true} />}
              label={'탈퇴'}
              value={'end'}
              labelPlacement={'end'}
            />
            <FormControlLabel
              control={<Checkbox size={'medium'} defaultChecked={true} />}
              label={'주문불가'}
              value={'end'}
              labelPlacement={'end'}
            />
          </SearchFormItem>
        </SearchFormRow>
      </SearchForm>
    </StoriesWrap>
  )
}

export default {
  title: 'components/YGUI/SearchForm',
  component: SearchForm,
} as Meta

export const DefaultSearchForm = Template.bind({})
DefaultSearchForm.args = {}
