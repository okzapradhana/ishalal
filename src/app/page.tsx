"use client";

import { useState, useMemo } from "react";
import { allAnimals } from "@/data/animals";
import { FilterState } from "@/types";
import { Language, translations } from "@/data/translations";
import FilterBar from "@/components/FilterBar";
import AnimalTable from "@/components/AnimalTable";
import Footer from "@/components/Footer";
import { getAbbreviatedRuling } from "@/data/rulingCodes";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    mazhab: "all",
    animalType: "all",
    status: "all",
  });

  const t = translations[language];

  const filteredAnimals = useMemo(() => {
    return allAnimals.filter((animal) => {
      // Search filter (case-insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        if (!animal.name.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Filter by animal type
      if (filters.animalType !== "all" && animal.type !== filters.animalType) {
        return false;
      }

      // Filter by mazhab and status
      if (filters.mazhab !== "all") {
        const mazhabsToCheck = Array.isArray(filters.mazhab)
          ? filters.mazhab
          : [filters.mazhab];

        const hasMatchingRuling = mazhabsToCheck.some((mazhab) => {
          const ruling = animal.rulings[mazhab];
          if (!ruling) return false;

          const normalizedRuling = ruling.toUpperCase();

          // Handle status filter
          if (filters.status !== "all") {
            if (filters.status === "HALAL") {
              if (normalizedRuling.includes("MAKRUH")) return false;
              return normalizedRuling.includes("HALAL");
            }
            if (filters.status === "HARAM") {
              return normalizedRuling.includes("HARAM");
            }
            if (filters.status === "MAKRUH") {
              return normalizedRuling.includes("MAKRUH") && !normalizedRuling.includes("HARAM");
            }
          }
          return true;
        });

        if (!hasMatchingRuling) return false;
      } else {
        // When no specific mazhab is selected, check if any mazhab matches the status filter
        if (filters.status !== "all") {
          const hasMatchingRuling = Object.values(animal.rulings).some((ruling) => {
            if (!ruling) return false;
            const normalizedRuling = ruling.toUpperCase();

            if (filters.status === "HALAL") {
              if (normalizedRuling.includes("MAKRUH")) return false;
              return normalizedRuling.includes("HALAL");
            }
            if (filters.status === "HARAM") {
              return normalizedRuling.includes("HARAM");
            }
            if (filters.status === "MAKRUH") {
              return normalizedRuling.includes("MAKRUH") && !normalizedRuling.includes("HARAM");
            }
            return false;
          });
          return hasMatchingRuling;
        }
      }

      return true;
    });
  }, [filters, searchQuery]);

  // Collect unique footnote codes from filtered animals
  const activeFootnotes = useMemo(() => {
    const footnoteSet = new Set<string>();
    filteredAnimals.forEach((animal) => {
      Object.values(animal.rulings).forEach((ruling) => {
        if (ruling) {
          const { hasFootnote } = getAbbreviatedRuling(ruling);
          if (hasFootnote) {
            const { display } = getAbbreviatedRuling(ruling);
            footnoteSet.add(display);
          }
        }
      });
    });
    return Array.from(footnoteSet);
  }, [filteredAnimals]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900">
      {/* Header */}
      <header className="bg-teal-900/40 border-b border-teal-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-teal-50 text-center">
            {t.title}
          </h1>
          <p className="text-center text-teal-300 mt-2">
            {t.subtitle}
          </p>
          <p className="text-center text-teal-400 mt-4 text-sm">
            Data curated by{" "}
            <a
              href="https://twitter.com/gus_arifin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-teal-200 underline font-medium"
            >
              @gus_arifin
            </a>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          language={language}
          onLanguageChange={setLanguage}
        />

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-teal-900/50 text-teal-50 placeholder-teal-400 transition-all duration-200"
          />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-teal-300">
            {t.showing} <span className="font-semibold text-teal-50">{filteredAnimals.length}</span> {t.of}{" "}
            <span className="font-semibold text-teal-50">{allAnimals.length}</span> {t.animals}
          </p>
        </div>

        <AnimalTable animals={filteredAnimals} selectedMazhab={filters.mazhab} language={language} />

        <Footer language={language} activeFootnotes={activeFootnotes} />
      </main>
    </div>
  );
}
