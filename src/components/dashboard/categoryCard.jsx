import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function CategoryCard({
  name,
  color,
  spent,
  limit,
  percentage,
  isOver,
}) {
  const getProgressColor = (percent) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 75) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-gray-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle className="text-lg font-semibold">
              <div style={color={color}}>{name}</div>
            </CardTitle>
          </div>
          {isOver && (
            <Badge variant="destructive" className="animate-pulse">
              OVER BUDGET
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span className="font-medium">{percentage.toFixed(1)}%</span>
          </div>
          <Progress
            value={percentage}
            className={`h-2 ${getProgressColor(percentage)}`}
          />
        </div>

        {/* Amounts */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-slate-500">Spent</p>
            <p className="font-semibold text-slate-900">
              ₹{spent.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500">Limit</p>
            <p className="font-semibold text-slate-900">
              ₹{limit.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Remaining */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-sm">
            <span className="text-slate-500">Remaining: </span>
            <span
              className={`font-semibold ${
                isOver ? "text-red-600" : "text-emerald-600"
              }`}
            >
              ₹{(limit - spent)}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
