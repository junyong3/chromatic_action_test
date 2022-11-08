import { GridRowId } from '@mui/x-data-grid'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

export interface batchModalState {
  selectionIds: Array<GridRowId>
  isOpenSave: boolean
  setIsOpenSave: (isOpen: boolean) => void
  setSelectionIds: (ids: Array<GridRowId>) => void
  reset: () => void
}
const initialSearchInput = {
  selectionIds: [],
  isOpenSave: false,
}
const useBatchModal = create<batchModalState, [['zustand/devtools', never]]>(
  devtools((set) => ({
    ...initialSearchInput,
    setIsOpenSave: (isOpen) => {
      set({ isOpenSave: isOpen })
    },
    setSelectionIds: (ids) => {
      set({ selectionIds: ids })
    },
    reset: () => {
      set({ ...initialSearchInput })
    },
  }))
)

export default useBatchModal
