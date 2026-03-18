"use client";

import { RulingStatus } from "@/types";
import { getAbbreviatedRuling } from "@/data/rulingCodes";

interface StatusBadgeProps {
  status: RulingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { display, category } = getAbbreviatedRuling(status);

  if (!status) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-800/50 text-teal-300 border border-teal-600/50">
        No Ruling
      </span>
    );
  }

  // Color based on category - optimized for dark backgrounds
  const colorClasses = {
    HALAL: "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50",
    HARAM: "bg-red-900/50 text-red-300 border border-red-700/50",
    MAKRUH: "bg-amber-900/50 text-amber-300 border border-amber-700/50",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[category]}`}>
      {display}
    </span>
  );
}
