import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ReportsRow from "./ReportsRow";

const ReportsTable = ({ categories }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Spent</TableHead>
          <TableHead>Budget</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((data, index) => (
          <ReportsRow key={index} data={data} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportsTable;
