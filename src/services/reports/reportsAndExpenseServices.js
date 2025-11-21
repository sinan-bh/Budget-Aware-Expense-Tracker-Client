import api from "../api";

export const addExpense = (data) => api.post("/expense", data);
export const getExpense = (month) => api.get(`/expense?month=${month}`);
export const getReports = (month) => api.get(`/reports?month=${month}`);
