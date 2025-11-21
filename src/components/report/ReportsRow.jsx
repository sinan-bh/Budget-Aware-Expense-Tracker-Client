// components/reports/ReportsRow.jsx
import { TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const ReportsRow = ({ data }) => {
  return (
    <TableRow>
      <TableCell className="font-medium flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: data.color }}
        />
        {data.name}
      </TableCell>

      <TableCell>₹{data.spent}</TableCell>
      <TableCell>₹{data.budget}</TableCell>

      <TableCell
        className={
          data.isOverBudget
            ? "text-red-600 font-semibold"
            : "text-green-600 font-semibold"
        }
      >
        ₹{data.remaining.toLocaleString()}
      </TableCell>

      <TableCell className="w-[150px]">
        <Progress value={data.progress} className="h-2" />
        <span className="text-sm text-gray-500">{data.progress}%</span>
      </TableCell>
    </TableRow>
  );
};

export default ReportsRow;
