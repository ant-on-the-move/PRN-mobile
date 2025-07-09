import { create } from 'zustand'

interface UIState {
  // Loading states
  isLoading: boolean
  loadingMessage: string
  
  // Modal states
  isModalOpen: boolean
  modalType: 'target' | 'request' | 'payment' | 'profile' | null
  
  // Toast states
  toast: {
    visible: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }
  
  // Navigation states
  activeTab: 'targets' | 'requests'
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void
  openModal: (type: 'target' | 'request' | 'payment' | 'profile') => void
  closeModal: () => void
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void
  hideToast: () => void
  setActiveTab: (tab: 'targets' | 'requests') => void
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  isLoading: false,
  loadingMessage: '',
  isModalOpen: false,
  modalType: null,
  toast: {
    visible: false,
    message: '',
    type: 'info',
  },
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

  showToast: (message, type = 'info') => {
    set({
      toast: {
        visible: true,
        message,
        type,
      },
    })
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      get().hideToast()
    }, 3000)
  },

  hideToast: () => {
    set({
      toast: {
        visible: false,
        message: '',
        type: 'info',
      },
    })
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab })
  },
})) 

export default useUIStore