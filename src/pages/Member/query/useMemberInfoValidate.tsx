import NetworkService from '@api/NetworkService'
import { COMMERCE_MEMBER_API_PATH } from '@api/path/Commerce/memberPath'
import { useMutationWrap } from '@queries/useMutation'

export type useMemberInfoValidateProps = {
  target: 'phone' | 'email'
  value: string
  callback: (items: any) => void
}

function useMemberInfoValidate(id: string) {
  const { mutate } = useMutationWrap()

  const validate = ({
    target,
    value,
    callback,
  }: useMemberInfoValidateProps) => {
    let req = null
    switch (target) {
      case 'phone':
        req = NetworkService.commerceMember.post(
          COMMERCE_MEMBER_API_PATH.VALIDATE_PHONE,
          {
            userID: id,
            phone: value,
          }
        )
        break
      case 'email':
        req = NetworkService.commerceMember.post(
          COMMERCE_MEMBER_API_PATH.VALIDATE_EMAIL,
          {
            userID: id,
            email: value,
          }
        )
        break
    }
    mutate(req, {
      onSuccess: ({ data }) => callback(data),
    })
  }

  return { validate }
}

export default useMemberInfoValidate
