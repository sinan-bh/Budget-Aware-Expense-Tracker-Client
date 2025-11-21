import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CategoryCard } from "./categoryCard";
import { getCategories } from "../../services/category/categoryServices";
import { getBudgets } from "../../services/budgets/budgetsServices";
import { getExpense } from "../../services/reports/reportsAndExpenseServices";
import useCalendarStore from "../../hooks/store/calendarStore";

export default function DashboardContainer() {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { selectedMonthString, refreshDashboard, setRefreshDashboard } =
    useCalendarStore();
  const loadData = async () => {
    const c = await getCategories();
    const b = await getBudgets(selectedMonthString);
    const e = await getExpense(selectedMonthString);
    setCategories(c.data?.data?.categories || []);
    setBudgets(b.data?.data.budgets || []);
    setExpenses(e.data?.data || []);
  };

  useEffect(() => {
    loadData();
    if (refreshDashboard) {
      setRefreshDashboard(false);
    }
  }, [selectedMonthString, refreshDashboard]);

  return (
    <div className="pr-2 pl-2">
      <div className="max-w-7xl mx-auto bg-white p-4">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold mb-4 mt-4">Dashboard</h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((cat) => {
            const budget = budgets.find((b) => b.categoryId._id === cat._id);
            const expense = expenses.find((b) => b.categoryId._id === cat._id);

            const spent = expenses
              .filter((ex) => ex.categoryId._id === cat._id)
              .reduce((sum, ex) => sum + ex.amount, 0);

            const limit = budget?.limit || 0;
            const percentage = limit ? Math.min((spent / limit) * 100, 100) : 0;

            const isOver = limit > 0 && spent > limit;
            return (
              <CategoryCard
                key={cat._id}
                name={cat.name}
                color={cat.color}
                spent={spent}
                limit={limit || 0}
                percentage={percentage}
                isOver={isOver}
              />
            );
          })}
        </div>

        {/* Add Expense Modal */}
      </div>
    </div>
  );
}
