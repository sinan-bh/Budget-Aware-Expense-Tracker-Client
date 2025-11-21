import React from "react";
import { Loader2 } from "lucide-react";

export default function LoaderBlock({ label }) {
  return (
    <div className="text-center py-8 text-gray-500">
      <Loader2 className="animate-spin inline-block mr-2" />
      {label}
    </div>
  );
}
