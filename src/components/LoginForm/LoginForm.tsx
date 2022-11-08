import { useState } from 'react'
import Button from '@components/Button'
import ErrorCode from '@api/Instance/errorCode'
import { useAuthStore } from '@stores/auth.store'
import { Alert } from '@mui/material'
import LoadingService from '@services/LoadingService'
import { To } from '@routes/To'
import { MSG } from '@constants/MessageCode/msg'
import { useMutationWrap } from '@queries/useMutation'
import Instance from '@api/Instance'
import { LoginReq, LoginRes } from '@api/model/IAM/login'
import { FormProvider, useForm } from 'react-hook-form'
import TextFieldElement from '@components/TextField/InputTextField'
import { useNavigate } from 'react-router-dom'
import { IAMErrorRes, IAMSuccessRes } from '@api/model/IAMRes'
import { AxiosError } from 'axios'
import * as Sentry from '@sentry/react'
import LoginPageDialog from '@components/Dialog/LoginErrorDialog'
import { IAM_API_PATH } from '@api/path/IAM/iamPath'
import { REGEXP } from '@src/constants/REGEXP'

function LoginForm() {
  const { mutate } = useMutationWrap<LoginRes>()
  const navigate = useNavigate()

  const [isEmailNotFound, setIsEmailNotFound] = useState(false)
  const [invalidParametersError, setInvalidParametersError] = useState(false)

  const setIsAccountLocked = useAuthStore((state) => state.setIsAccountLocked)
  const numOfLoginFailure = useAuthStore((state) => state.numOfLoginFailure)
  const setNumOfLoginFailure = useAuthStore(
    (state) => state.setNumOfLoginFailure
  )

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const setLoggedEmail = useAuthStore((state) => state.setLoggedEmail)
  const setTemporallyStoredEmailForChangingPassword = useAuthStore(
    (state) => state.setTemporallyStoredEmailForChangingPassword
  )

  const methods = useForm<LoginReq>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      otp: '',
    },
  })

  const onSubmit = methods.handleSubmit((params) => {
    LoadingService.show()

    const onSuccess = (response: IAMSuccessRes<any>) => {
      if (response.success) {
        const { data } = response

        Instance.setAccessToken(data.accessToken)
        Instance.setRefreshToken(data.refreshToken)

        setLoggedEmail(data.username)
        Sentry.setUser({ email: data.username })
        setIsLoggedIn(true)
        navigate(To.Home, { replace: true })
      }
    }

    const onError = (error: AxiosError<IAMErrorRes<any>>) => {
      let numFailures = 0
      const errorCode = error.response?.data?.code
      switch (errorCode) {
        case ErrorCode.ACCESS_DENIED_ACCOUNT_DISABLE:
          setIsAccountLocked(true)

          numFailures = error.response?.data?.data.signInFailureCount || 0
          if (numFailures) {
            setNumOfLoginFailure(numFailures)
          }
          break
        case ErrorCode.TYPE_ERROR:
        case ErrorCode.ACCESS_DENIED:
        case ErrorCode.NOT_FOUND_ERROR:
          setIsEmailNotFound(true)
          break
        case ErrorCode.INVALID_PARAMETERS:
          setInvalidParametersError(true)
          break
        case ErrorCode.RESOLVE_REQUIRED_ACTIONS:
          setTemporallyStoredEmailForChangingPassword(params.username)
          navigate(To.ChangePassword)
          break
      }
    }

    const onSettled = () => LoadingService.close()

    mutate(Instance.post<LoginReq>(IAM_API_PATH.LOGIN, params), {
      onSuccess,
      onError,
      onSettled,
    })
  })

  const handleFocusOtp = () => {
    if (import.meta.env.DEV) {
      const secret = import.meta.env.VITE_OTP_SECRET
      if (secret) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        methods.setValue('otp', window.otplib.authenticator.generate(secret), {
          shouldValidate: true,
        })
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <TextFieldElement
          size={'medium'}
          name={'username'}
          label={'이메일'}
          data-cy={'email'}
          fullWidth
          validation={{
            required: {
              value: true,
              message: MSG.ERROR.NO_EMAIL,
            },
            pattern: {
              value: REGEXP.EMAIL,
              message: '이메일 형식을 확인해주세요.',
            },
          }}
          sx={{ marginTop: '12px' }}
        />
        <TextFieldElement
          size={'medium'}
          name={'password'}
          type={'password'}
          label={'비밀번호'}
          data-cy={'password'}
          fullWidth
          validation={{
            required: {
              value: true,
              message: MSG.ERROR.NO_PASSWORD,
            },
          }}
          sx={{ marginTop: '12px' }}
        />
        <TextFieldElement
          size={'medium'}
          name={'otp'}
          label={'OTP 인증번호'}
          data-cy={'otp'}
          fullWidth
          validation={{
            required: {
              value: true,
              message: MSG.ERROR.NO_OTP,
            },
            pattern: {
              value: REGEXP.OTP,
              message: 'OTP 인증번호 형식을 확인하세요',
            },
          }}
          onFocus={handleFocusOtp}
          sx={{ marginTop: '12px' }}
        />
        {(invalidParametersError ||
          isEmailNotFound ||
          (numOfLoginFailure > 0 && numOfLoginFailure < 5)) && (
          <Alert data-cy={'alert'} sx={{ mt: 1.5 }} severity="error">
            {MSG.ERROR.UNAUTHORIZED_SUBMIT}
          </Alert>
        )}
        <Button
          type={'submit'}
          data-cy={'submit'}
          variant="contained"
          fullWidth
          sx={{ margin: '32px 0 40px' }}
          data-sb-kind={'pages/Home'}
        >
          로그인
        </Button>
        <LoginPageDialog />
      </form>
    </FormProvider>
  )
}

export default LoginForm
