import Button from '@components/Button'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { Address } from 'react-daum-postcode/lib/loadPostcode'
import usePostCodeStore from '@stores/postCode.store'

type PostCodePopupProps = {
  disabled?: boolean
}
function PostCodePopup(props: PostCodePopupProps) {
  const { disabled = false } = props
  const setPostCode = usePostCodeStore((state) => state.setPostCode)
  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  )

  const handleComplete = (data: Address) => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    setPostCode({
      zonecode: data.zonecode,
      address: fullAddress,
    })
  }

  const handleClick = () => {
    open({ onComplete: handleComplete })
  }

  return (
    <Button
      disabled={disabled}
      variant="contained"
      data-cy="postCodeBtn"
      onClick={handleClick}
    >
      주소검색
    </Button>
  )
}
export default PostCodePopup
