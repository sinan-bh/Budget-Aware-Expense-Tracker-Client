import React from "react";
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
import { Loader2, Tag, Palette } from "lucide-react";

export default function CategoryModal({
  open,
  onClose,
  form,
  setForm,
  onSave,
  isSaving,
  currentCategory,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Tag /> Name
            </Label>
            <Input
              className="col-span-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right flex gap-2 items-center">
              <Palette /> Color
            </Label>
            <Input
              type="color"
              className="col-span-3 h-10"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={onSave} disabled={isSaving}>
            {isSaving && <Loader2 className="animate-spin mr-2" />}
            {currentCategory ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
