import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, DollarSign } from "lucide-react";
import useCalendarStore from "../../hooks/store/calendarStore";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../services/category/categoryServices";
import { upsertBudget } from "../../services/budgets/budgetsServices";
import CategoryList from "./categoryList";
import BudgetList from "./budgetList";
import CategoryModal from "./CategoryModal";
import LoaderBlock from "./LoaderBlock";

export default function SettingsContainer() {
  const { selectedMonthString } = useCalendarStore();

  // ------------ CATEGORY STATE ------------
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    color: "#000000",
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // ------------ BUDGET STATE ------------
  const [budgetInputs, setBudgetInputs] = useState({});
  const [savingBudgets, setSavingBudgets] = useState(false);

  // ------------ LOAD CATEGORIES ------------
  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await getCategories();
      setCategories(res.data?.data?.categories || []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ------------ CATEGORY HANDLERS ------------
  const openAddCategory = () => {
    setCurrentCategory(null);
    setCategoryForm({ name: "", color: "#000000" });
    setShowCategoryModal(true);
  };

  const openEditCategory = (cat) => {
    setCurrentCategory(cat);
    setCategoryForm({ name: cat.name, color: cat.color });
    setShowCategoryModal(true);
  };

  const saveCategory = async () => {
    setIsSavingCategory(true);
    try {
      await createCategory(categoryForm);
      toast.success("Category created");
      setShowCategoryModal(false);
      loadCategories();
    } catch {
      toast.error("Failed to save category");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      loadCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  // ------------ BUDGET HANDLERS ------------
  const updateBudgetInput = (id, value) => {
    setBudgetInputs((prev) => ({
      ...prev,
      [id]: value === "" ? "" : Number(value),
    }));
  };

  const saveBudgets = async () => {
    setSavingBudgets(true);
    try {
      const tasks = Object.entries(budgetInputs).map(([categoryId, limit]) =>
        upsertBudget({
          categoryId,
          limit: Number(limit),
          month: selectedMonthString,
        })
      );

      await Promise.all(tasks);

      toast.success("Budgets saved");
    } catch {
      toast.error("Failed to save budgets");
    } finally {
      setSavingBudgets(false);
    }
  };

  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="">
        {/* ---------- CATEGORY SECTION ---------- */}
        <Card className="mb-10 shadow-md">
          <CardHeader className="flex-row justify-between">
            <CardTitle>Manage Categories</CardTitle>
            <Button className="gap-2" onClick={openAddCategory}>
              <Plus /> Add Category
            </Button>
          </CardHeader>

          <CardContent>
            {loadingCategories ? (
              <LoaderBlock label="Loading categories..." />
            ) : (
              <CategoryList
                categories={categories}
                onEdit={openEditCategory}
                onDelete={removeCategory}
              />
            )}
          </CardContent>
        </Card>

        {/* ---------- BUDGET SECTION ---------- */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Manage Monthly Budgets</CardTitle>
              <Button onClick={saveBudgets} disabled={savingBudgets}>
                {savingBudgets ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <DollarSign />
                )}
                Save Budgets
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <BudgetList
              categories={categories}
              budgetInputs={budgetInputs}
              onChange={updateBudgetInput}
            />
          </CardContent>
        </Card>

        {/* ---------- CATEGORY MODAL ---------- */}
        <CategoryModal
          open={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          form={categoryForm}
          setForm={setCategoryForm}
          onSave={saveCategory}
          isSaving={isSavingCategory}
          currentCategory={currentCategory}
        />
      </div>
    </div>
  );
}
