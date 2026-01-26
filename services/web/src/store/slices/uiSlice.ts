// services/web/src/store/slices/uiSlice.ts
import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface Modal {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

interface UIState {
  // Cart Sidebar
  isCartOpen: boolean;
  
  // Mobile Menu
  isMobileMenuOpen: boolean;
  
  // Modals
  modals: Modal[];
  
  // Toasts/Notifications
  toasts: Toast[];
  
  // Loading States
  globalLoading: boolean;
  
  // Theme
  theme: 'light' | 'dark';
  
  // Search
  searchQuery: string;
  isSearchFocused: boolean;
}

interface UIActions {
  // Cart Sidebar
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Mobile Menu
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  
  // Modals
  openModal: (modal: Omit<Modal, 'isOpen'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  
  // Toasts
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Loading
  setGlobalLoading: (loading: boolean) => void;
  
  // Theme
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  
  // Search
  setSearchQuery: (query: string) => void;
  setSearchFocused: (focused: boolean) => void;
  clearSearch: () => void;
}

type UIStore = UIState & UIActions;

let toastIdCounter = 0;
const generateToastId = () => `toast-${++toastIdCounter}`;

export const useUIStore = create<UIStore>((set, get) => ({
  // Initial State
  isCartOpen: false,
  isMobileMenuOpen: false,
  modals: [],
  toasts: [],
  globalLoading: false,
  theme: 'light',
  searchQuery: '',
  isSearchFocused: false,

  // Cart Sidebar Actions
  openCart: () =>
    set({
      isCartOpen: true,
    }),

  closeCart: () =>
    set({
      isCartOpen: false,
    }),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  // Mobile Menu Actions
  openMobileMenu: () =>
    set({
      isMobileMenuOpen: true,
    }),

  closeMobileMenu: () =>
    set({
      isMobileMenuOpen: false,
    }),

  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),

  // Modal Actions
  openModal: (modal) =>
    set((state) => ({
      modals: [...state.modals, { ...modal, isOpen: true }],
    })),

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal
      ),
    })),

  closeAllModals: () =>
    set({
      modals: [],
    }),

  // Toast Actions
  showToast: (toast) => {
    const id = generateToastId();
    const duration = toast.duration || 3000;

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    // Auto remove toast after duration
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearToasts: () =>
    set({
      toasts: [],
    }),

  // Loading Actions
  setGlobalLoading: (loading) =>
    set({
      globalLoading: loading,
    }),

  // Theme Actions
  setTheme: (theme) =>
    set({
      theme,
    }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),

  // Search Actions
  setSearchQuery: (query) =>
    set({
      searchQuery: query,
    }),

  setSearchFocused: (focused) =>
    set({
      isSearchFocused: focused,
    }),

  clearSearch: () =>
    set({
      searchQuery: '',
      isSearchFocused: false,
    }),
}));