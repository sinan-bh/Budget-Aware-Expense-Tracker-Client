import { create } from "zustand";

const useAddExpenseModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useAddExpenseModalStore;
