import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import BudgetRow from "./BudgetRow";

export default function BudgetList({ categories, budgetInputs, onChange }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Limit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((cat) => (
          <BudgetRow
            key={cat._id}
            category={cat}
            value={budgetInputs[cat._id] ?? ""}
            onChange={onChange}
          />
        ))}
      </TableBody>
    </Table>
  );
}
