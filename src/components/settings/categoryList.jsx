import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CategoryRow from "./CactegoryRow";

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((cat) => (
          <CategoryRow
            key={cat._id}
            category={cat}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}
