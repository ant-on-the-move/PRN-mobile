import { create } from 'zustand'

interface UIState {
  // Loading states
  isLoading: boolean
  loadingMessage: string
  
  // Modal states
  isModalOpen: boolean
  modalType: 'target' | 'request' | 'payment' | 'profile' | null
  
  // Navigation states
  activeTab: 'targets' | 'requests'
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void
  openModal: (type: 'target' | 'request' | 'payment' | 'profile') => void
  closeModal: () => void
  setActiveTab: (tab: 'targets' | 'requests') => void
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  isLoading: false,
  loadingMessage: '',
  isModalOpen: false,
  modalType: null,
  activeTab: 'targets',

  // Actions
  setLoading: (loading: boolean, message: string = '') => {
    set({
      isLoading: loading,
      loadingMessage: message,
    })
  },

  openModal: (type) => {
    set({
      isModalOpen: true,
      modalType: type,
    })
  },

  closeModal: () => {
    set({
      isModalOpen: false,
      modalType: null,
    })
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab })
  },
})) 

export default useUIStore