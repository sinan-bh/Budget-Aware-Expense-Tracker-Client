import { create } from "zustand";

const useCalendarStore = create((set) => ({
  currentMonth: new Date(),
  currentYear: new Date().getFullYear(),
  //"2025-06"
  selectedMonthString: `${new Date().getFullYear()}-${(
    new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`,

  refreshDashboard: false,
  setRefreshDashboard: (value) => set({ refreshDashboard: value }),

  setMonth: (month) =>
    set((state) => {
      const newDate = new Date(state.currentMonth);
      newDate.setMonth(month);
      return { currentMonth: newDate };
    }),
  setYear: (year) =>
    set((state) => {
      const newDate = new Date(state.currentMonth);
      newDate.setFullYear(year);
      return { currentMonth: newDate };
    }),
  setSelectedMonthYear: (date) =>
    set(() => ({
      currentMonth: date,
      currentYear: date.getFullYear(),
      selectedMonthString: `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`,
    })),
  setMonthAndYear: (date) => set({ currentMonth: date }),
}));

export default useCalendarStore;
