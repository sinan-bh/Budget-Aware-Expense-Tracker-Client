import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function CategoryRow({ category, onDelete }) {
  return (
    <TableRow>
      <TableCell className="flex gap-2 items-center">
        {category.name}
      </TableCell>

      <TableCell className="text-right">

        <Button variant="destructive" size="icon" onClick={() => onDelete(category._id)}>
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  );
}
