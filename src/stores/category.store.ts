import create from 'zustand'

interface CategoryStoreState {
  categoryList: any[]
  setCategoryList: (dataSet: any[]) => void

  isMainCategory: boolean
  setIsMainCategory: (isMainCategory: boolean) => void

  selectedNodeId: string
  setSelectedNodeId: (selectedNodeId: string) => void

  selectedNode: any
  setSelectedNode: (selectedNode: any) => void
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
  categoryList: [],
  setCategoryList: (dataSet: any[]) => {
    set({ categoryList: dataSet })
  },

  isMainCategory: false,
  setIsMainCategory: (isMainCategory: boolean) => {
    set({ isMainCategory })
  },

  selectedNodeId: '',
  setSelectedNodeId: (selectedNodeId: string) => {
    set({ selectedNodeId })
  },

  selectedNode: {},
  setSelectedNode: (selectedNode: any) => {
    set({ selectedNode })
  },
}))
