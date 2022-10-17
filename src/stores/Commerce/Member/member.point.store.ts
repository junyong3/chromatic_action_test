import create from 'zustand'

interface MemberPointStoreState {
  // 사용가능 포인트
  usablePoint: number
  setUsablePoint: (usablePoint: number) => void
  // 소멸예정 포인트
  expiringPoint: number
  setExpiringPoint: (expiringPoint: number) => void

  // 포인트 사용 모달
  isUsePointDialog: boolean
  setIsUsePointDialog: (isUsePointDialog: boolean) => void

  // 포인트 지급 모달
  isGivePointDialog: boolean
  setIsGivePointDialog: (isGivePointDialog: boolean) => void
}

export const useMemberPointStore = create<MemberPointStoreState>((set) => ({
  usablePoint: 0,
  setUsablePoint: (usablePoint: number) => set({ usablePoint }),
  expiringPoint: 0,
  setExpiringPoint: (expiringPoint: number) => set({ expiringPoint }),
  isUsePointDialog: false,
  setIsUsePointDialog: (isUsePointDialog: boolean) => set({ isUsePointDialog }),
  isGivePointDialog: false,
  setIsGivePointDialog: (isGivePointDialog: boolean) =>
    set({ isGivePointDialog }),
}))
