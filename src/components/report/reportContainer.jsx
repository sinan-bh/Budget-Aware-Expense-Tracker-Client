import { useState, useEffect } from "react";
import { getReports } from "../../services/reports/reportsAndExpenseServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCalendarStore from "../../hooks/store/calendarStore";

import ReportsTable from "./ReportsTable";

export default function ReportsConatiner() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedMonthString } = useCalendarStore();

  const loadReportData = async () => {
    setLoading(true);
    try {
      const c = await getReports(selectedMonthString);
      setCategories(c.data?.data?.report || []);
    } catch (error) {
      console.error("Failed to fetch report data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportData();
  }, [selectedMonthString]);

  return (
    <div className="container mx-auto pl-2 pr-2 rounded-sm">
      <Card className="shadow-lg">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Monthly Report</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading report data...
            </div>
          ) : (
            <ReportsTable categories={categories} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

