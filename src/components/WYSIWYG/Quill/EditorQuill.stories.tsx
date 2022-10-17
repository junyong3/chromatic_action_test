import { Story, Meta } from '@storybook/react'
import Button from '@components/Button'
import { EditorQuillProps } from '@components/WYSIWYG/Quill/Props'
import EditorQuill from '@components/WYSIWYG/Quill/EditorQuill'
import { QuillEditorWrap } from '@components/WYSIWYG/Quill/StyleObj'
import { useState } from 'react'

const Template: Story<EditorQuillProps> = (args: EditorQuillProps) => {
  const [quillValue, setQuillValue] = useState('')

  return (
    <QuillEditorWrap>
      <div className={'header'}>
        <Button
          variant={'contained'}
          color={'primary'}
          onClick={() => {
            console.log(quillValue)
          }}
        >
          Log 출력
        </Button>
      </div>
      <div className={'editor-quill'}>
        <EditorQuill
          defaultEditorValue={args.defaultEditorValue}
          editorValueChange={setQuillValue}
        />
      </div>
    </QuillEditorWrap>
  )
}
export default {
  title: 'components/WYSIWYG/Quill',
  component: EditorQuill,
} as Meta

export const Default = Template.bind({})
Default.args = {
  editorValueChange: (value: any) => {
    console.log(value)
  },
  defaultEditorValue: `<p><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">[2022-05-04]</span><br></p>n<p style="margin-left:0px;"><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">안녕하세요, 고객님 정육각입니다!</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">최근 정육각에서 판매중인 일부 상품의 가격을 조정하게 되어 안내 말씀드립니다.</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">1. 가격 조정 사유에 대한 안내</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 정육각은 고객님께 초신선한 상품을 최대한 합리적인 가격에 제공해드리고자 노력하고 있습니다. 하지만 최근 전 세계적인 사료가격 상승과 전반적인 수요 증가로 인해 원재료 공급가가 불안정하여, 부득이하게 일부 상품 가격을 조정하게 되었습니다.</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 또한 정육각은 가장 초신선한 상품만 고객님께 제공해드리고자 합니다. 따라서 미리 재고를 확보하여 생산해두었다가 보내드리는 것이 아니라, 고객님께서 주문을 해주시면 갓 입고된 원재료를 바로 생산하여 포장 및 발송해드립니다. 이로 인해 원재료 가격 변동 영향을 빠르게 받을 수밖에 없는 점 고객님의 너른 양해 부탁드립니다.</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 당분간은 원재료 가격 상승 추세가 지속될 것으로 예상되나, 상황을 지속적으로 모니터링하며 추후 원재료 가격이 다시 안정되는 경우 상품 가격에 빠르게 반영할 수 있도록 노력하겠습니다.</span><br><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">2. 상품별 가격 조정에 대한 안내</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 공지사항 게시판에 가격 조정 시점마다 상세 내용을 공지해드립니다.</span><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● </span><a href="https://jeongyookgak.com/notice?target=wqkAhhXKq2pfhMDuScXS" target="_self"><span style="color: blue;font-size: 16px;font-family: Spoqa Han Sans;">상품별 가격 조정 내역 자세히 보기(2022.07.22) &gt;</span></a><br><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">3. 적용 시점 전 주문, 적용 시점 후 생산되는 주문에 대한 안내</span><br><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 적용 시점 이후부터 받아보시는 개별 상품의 라벨에는 변경 후 가격이 표기됩니다.</span><br><span style="color: rgb(155,155,155);font-size: 16px;font-family: Spoqa Han Sans;">● 단, 적용 시점 이전 등록된 주문 중 가격이 인상된 상품의 실제 결제는 인상 전 가격으로 진행됩니다.</span><br><br><span style="color: rgb(0,0,0);font-size: medium;font-family: Spoqa Han Sans;">구분가격 인상 상품가격 인하 상품상품 라벨 표기변경 후 가격실제 결제 금액변경 전 가격변경 후 가격</span><br><br><span style="color: rgb(0,0,0);font-size: medium;font-family: Spoqa Han Sans;">정육각을 믿고 이용해 주시는 고객님께 진심으로 감사드리며, 언제나 초신선한 상품과 서비스로 보답하는 정육각이 되겠습니다!</span><br><span style="color: rgb(0,0,0);font-size: medium;font-family: Spoqa Han Sans;">감사합니다.</span></p>n<p><br>&nbsp;</p>`,
}
