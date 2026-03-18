"use client";

import { FilterState, Mazhab } from "@/types";
import { useState, useEffect, useRef } from "react";
import { translations, Language } from "@/data/translations";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const MAZHABS: { name: Mazhab; arabic: string }[] = [
  { name: "Ja'fari", arabic: "الجعفرية" },
  { name: "Hanafi", arabic: "الحنفية" },
  { name: "Maliki", arabic: "المالكية" },
  { name: "Syafi'i", arabic: "الشافعية" },
  { name: "Hanbali", arabic: "الحنبلية" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "allAnimals" },
  { value: "land", label: "landAnimals" },
  { value: "sea", label: "seaAnimals" },
  { value: "both", label: "landAndSea" },
] as const;

const STATUS_OPTIONS = [
  { value: "all", label: "allStatus" },
  { value: "HALAL", label: "halal" },
  { value: "HARAM", label: "haram" },
  { value: "MAKRUH", label: "makruh" },
] as const;

type DropdownType = "mazhab" | "animalType" | "status" | null;

export default function FilterBar({
  filters,
  onFilterChange,
  language,
  onLanguageChange,
}: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const dropdownRefs = {
    mazhab: useRef<HTMLDivElement>(null),
    animalType: useRef<HTMLDivElement>(null),
    status: useRef<HTMLDivElement>(null),
  };

  const t = translations[language];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRefs.mazhab.current && !dropdownRefs.mazhab.current.contains(target)) {
        if (dropdownRefs.animalType.current && !dropdownRefs.animalType.current.contains(target)) {
          if (dropdownRefs.status.current && !dropdownRefs.status.current.contains(target)) {
            setOpenDropdown(null);
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filters,
      animalType: value as FilterState["animalType"],
    });
    setOpenDropdown(null);
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value as FilterState["status"],
    });
    setOpenDropdown(null);
  };

  const toggleMazhab = (mazhabName: Mazhab) => {
    if (filters.mazhab === "all") {
      onFilterChange({
        ...filters,
        mazhab: [mazhabName],
      });
    } else {
      const currentMazhabs = filters.mazhab;
      if (currentMazhabs.includes(mazhabName)) {
        const newMazhabs = currentMazhabs.filter((m) => m !== mazhabName);
        onFilterChange({
          ...filters,
          mazhab: newMazhabs.length === 0 ? "all" : newMazhabs,
        });
      } else {
        onFilterChange({
          ...filters,
          mazhab: [...currentMazhabs, mazhabName],
        });
      }
    }
  };

  const selectAllMazhabs = () => {
    onFilterChange({
      ...filters,
      mazhab: "all",
    });
    setOpenDropdown(null);
  };

  const getMazhabLabel = () => {
    if (filters.mazhab === "all") return t.allMazhab;
    if (filters.mazhab.length === 1) return filters.mazhab[0];
    return `${filters.mazhab.length} ${t.selected}`;
  };

  const getDropdownLabel = (options: typeof TYPE_OPTIONS | typeof STATUS_OPTIONS, value: string) => {
    const option = options.find((o) => o.value === value);
    if (option) return t[option.label as keyof typeof t];
    return value;
  };

  const isSelected = (mazhabName: Mazhab) => {
    return filters.mazhab !== "all" && filters.mazhab.includes(mazhabName);
  };

  const toggleDropdown = (type: DropdownType) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const DropdownButton = ({
    label,
    onClick,
    isOpen,
  }: {
    label: string;
    onClick: () => void;
    isOpen: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2 border border-teal-600 rounded-lg bg-teal-900/50 text-teal-50 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
    >
      <span className="truncate">{label}</span>
      <svg
        className={`w-5 h-5 text-teal-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <div className="bg-teal-900/40 border border-teal-700/50 backdrop-blur-sm rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-teal-50">{t.filters}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === "en"
                ? "bg-teal-500 text-white"
                : "bg-teal-900/50 text-teal-300 hover:bg-teal-800/50"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("id")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === "id"
                ? "bg-teal-500 text-white"
                : "bg-teal-900/50 text-teal-300 hover:bg-teal-800/50"
            }`}
          >
            ID
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mazhab Filter - Multi-Select Dropdown */}
        <div ref={dropdownRefs.mazhab} className="relative">
          <label className="block text-sm font-medium text-teal-300 mb-2">
            {t.mazhab}
          </label>
          <DropdownButton
            label={getMazhabLabel()}
            onClick={() => toggleDropdown("mazhab")}
            isOpen={openDropdown === "mazhab"}
          />

          {openDropdown === "mazhab" && (
            <div className="absolute z-20 w-full mt-1 bg-teal-900 border border-teal-600 rounded-lg shadow-lg max-h-64 overflow-auto">
              <div className="p-2">
                <button
                  onClick={selectAllMazhabs}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    filters.mazhab === "all"
                      ? "bg-teal-700 text-teal-50 font-medium"
                      : "text-teal-300 hover:bg-teal-800/50"
                  }`}
                >
                  {t.allMazhab}
                </button>
                <div className="border-t border-teal-700/50 my-1"></div>
                {MAZHABS.map((mazhab) => {
                  const selected = isSelected(mazhab.name);
                  return (
                    <div
                      key={mazhab.name}
                      onClick={() => toggleMazhab(mazhab.name)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                        selected ? "bg-teal-800/50" : "hover:bg-teal-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selected
                              ? "bg-teal-500 border-teal-500"
                              : "border-teal-600"
                          }`}
                        >
                          {selected && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={selected ? "text-teal-50 font-medium" : "text-teal-300"}>
                          {mazhab.name}
                        </span>
                      </div>
                      <span className="text-xs text-teal-500 rtl">{mazhab.arabic}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Animal Type Filter - Single Select Dropdown */}
        <div ref={dropdownRefs.animalType} className="relative">
          <label className="block text-sm font-medium text-teal-300 mb-2">
            {t.animalType}
          </label>
          <DropdownButton
            label={getDropdownLabel(TYPE_OPTIONS, filters.animalType)}
            onClick={() => toggleDropdown("animalType")}
            isOpen={openDropdown === "animalType"}
          />

          {openDropdown === "animalType" && (
            <div className="absolute z-20 w-full mt-1 bg-teal-900 border border-teal-600 rounded-lg shadow-lg max-h-64 overflow-auto">
              <div className="p-2">
                {TYPE_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleTypeChange(option.value)}
                    className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                      filters.animalType === option.value
                        ? "bg-teal-700 text-teal-50 font-medium"
                        : "text-teal-300 hover:bg-teal-800/50"
                    }`}
                  >
                    {t[option.label as keyof typeof t]}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Filter - Single Select Dropdown */}
        <div ref={dropdownRefs.status} className="relative">
          <label className="block text-sm font-medium text-teal-300 mb-2">
            {t.rulingStatus}
          </label>
          <DropdownButton
            label={getDropdownLabel(STATUS_OPTIONS, filters.status)}
            onClick={() => toggleDropdown("status")}
            isOpen={openDropdown === "status"}
          />

          {openDropdown === "status" && (
            <div className="absolute z-20 w-full mt-1 bg-teal-900 border border-teal-600 rounded-lg shadow-lg max-h-64 overflow-auto">
              <div className="p-2">
                {STATUS_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                      filters.status === option.value
                        ? "bg-teal-700 text-teal-50 font-medium"
                        : "text-teal-300 hover:bg-teal-800/50"
                    }`}
                  >
                    {t[option.label as keyof typeof t]}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
