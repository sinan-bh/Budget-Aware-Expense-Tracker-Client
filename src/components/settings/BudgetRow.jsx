import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function BudgetRow({ category, value, onChange }) {
    
  return (
    <TableRow>
      <TableCell className="flex gap-2 items-center">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        ></span>
        {category.name}
      </TableCell>

      <TableCell>
        <Input
          type="number"
          min="0"
          className="w-[150px]"
          value={value}
          onChange={(e) => onChange(category._id, e.target.value)}
          placeholder="0.00"
        />
      </TableCell>
    </TableRow>
  );
}
