import create from 'zustand'

interface AuthStoreState {
  isAuthEffectLoading: boolean
  setIsAuthEffectLoading: (isAuthEffectLoading: boolean) => void

  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void

  isAccountLocked: boolean
  setIsAccountLocked: (isAccountLocked: boolean) => void

  numOfLoginFailure: number
  setNumOfLoginFailure: (numOfLoginFailure: number) => void

  isFailedKeycloak: boolean
  setIsFailedKeycloak: (isFailedKeycloak: boolean) => void

  loggedEmail: string
  setLoggedEmail: (loggedEmail: string) => void

  temporallyStoredEmailForChangingPassword: string | null
  setTemporallyStoredEmailForChangingPassword: (
    temporallyStoredEmailForChangingPassword: string | null
  ) => void
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthEffectLoading: true,
  setIsAuthEffectLoading: (isAuthEffectLoading: boolean) =>
    set(() => ({ isAuthEffectLoading })),

  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),

  isAccountLocked: false,
  setIsAccountLocked: (isAccountLocked: boolean) =>
    set(() => ({ isAccountLocked })),

  numOfLoginFailure: 0,
  setNumOfLoginFailure: (numOfLoginFailure: number) =>
    set(() => ({ numOfLoginFailure })),

  isFailedKeycloak: false,
  setIsFailedKeycloak: (isFailedKeycloak: boolean) =>
    set(() => ({ isFailedKeycloak })),

  loggedEmail: '',
  setLoggedEmail: (loggedEmail: string) => set(() => ({ loggedEmail })),

  temporallyStoredEmailForChangingPassword: null,
  setTemporallyStoredEmailForChangingPassword: (
    temporallyStoredEmailForChangingPassword
  ) => set(() => ({ temporallyStoredEmailForChangingPassword })),
}))
