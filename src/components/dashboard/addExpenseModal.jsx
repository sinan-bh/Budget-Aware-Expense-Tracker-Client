import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, X, IndianRupee, Calendar, Tag } from "lucide-react";
import { getCategories } from "../../services/category/categoryServices";
import { addExpense } from "../../services/reports/reportsAndExpenseServices";
import toast from "react-hot-toast";

export default function AddExpenseModal({ open, onClose, reload }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    categoryId: "",
    amount: "",
    month: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (open) {
      getCategories()
        .then((res) => {
          setCategories(res?.data?.data?.categories);
          if (res.data?.data?.categories.length > 0) {
            setForm((prev) => ({ ...prev, categoryId: res.data.data.categories[0]._id }));
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
          setLoading(false);
        });
    }
  }, [open]);

  const handleSave = async () => {
    if (!form.categoryId || !form.amount || Number(form.amount) <= 0) {
      toast.error("Please select a category and enter a valid amount.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = { ...form, amount: Number(form.amount) };
      const res = await addExpense(payload);
      if (res.data.overBudget) {
        toast.error(
          "⚠️ Warning: This expense has put you over budget for the selected category!"
        );
      } else {
        toast.success("✅ Expense saved successfully!");
      }

      reload();
      onClose();
      setForm({
        categoryId: categories[0]?._id || "",
        amount: "",
        month: new Date().toISOString().slice(0, 10),
        description: "",
      });
    } catch (error) {
      console.error("Error saving expense:", error);
      toast.error("An error occurred while saving the expense.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
    setForm({
      categoryId: categories[0]?._id || "",
      amount: "",
      month: new Date().toISOString().slice(0, 10),
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-indigo-600" />
            </div>
            Add New Expense
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </Label>
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              <Select
                value={form.categoryId}
                onValueChange={(value) =>
                  setForm({ ...form, categoryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4" />
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="text-lg font-medium"
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={form.month}
              onChange={(e) => setForm({ ...form, month: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !form.amount || !form.categoryId}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <IndianRupee className="w-4 h-4" />
                Save Expense
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
