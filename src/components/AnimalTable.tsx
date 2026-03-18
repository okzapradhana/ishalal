import { Animal, Mazhab } from "@/types";
import StatusBadge from "./StatusBadge";
import { Language, translations } from "@/data/translations";

interface AnimalTableProps {
  animals: Animal[];
  selectedMazhab: Mazhab[] | "all";
  language: Language;
}

const MAZHABS: { name: Mazhab; arabic: string }[] = [
  { name: "Ja'fari", arabic: "الجعفرية" },
  { name: "Hanafi", arabic: "الحنفية" },
  { name: "Maliki", arabic: "المالكية" },
  { name: "Syafi'i", arabic: "الشافعية" },
  { name: "Hanbali", arabic: "الحنبلية" },
];

export default function AnimalTable({ animals, selectedMazhab, language }: AnimalTableProps) {
  const t = translations[language];

  if (animals.length === 0) {
    return (
      <div className="bg-teal-900/40 border border-teal-700/50 backdrop-blur-sm rounded-lg p-8 text-center">
        <p className="text-teal-300 text-lg">{t.noAnimalsMatch}</p>
      </div>
    );
  }

  // Determine which mazhabs to display
  const mazhabsToDisplay = selectedMazhab === "all"
    ? MAZHABS
    : MAZHABS.filter((m) => selectedMazhab.includes(m.name));

  return (
    <div className="bg-teal-900/40 border border-teal-700/50 backdrop-blur-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-teal-700/50">
          <thead className="bg-teal-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
                {t.no}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
                {t.animalName}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider">
                {t.type}
              </th>
              {mazhabsToDisplay.map((mazhab) => (
                <th
                  key={mazhab.name}
                  className="px-4 py-3 text-left text-xs font-medium text-teal-300 uppercase tracking-wider"
                >
                  <div className="flex flex-col">
                    <span>{mazhab.name}</span>
                    <span className="text-xs font-normal text-teal-400 rtl" dir="rtl">
                      {mazhab.arabic}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-teal-900/20 divide-y divide-teal-700/50">
            {animals.map((animal, index) => (
              <tr key={animal.id} className="hover:bg-teal-800/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-200">
                  {index + 1}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-teal-50">
                  {animal.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-teal-300">
                  {animal.type === "land" && t.land}
                  {animal.type === "sea" && t.sea}
                  {animal.type === "both" && t.landAndSeaShort}
                </td>
                {mazhabsToDisplay.map((mazhab) => (
                  <td key={mazhab.name} className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={animal.rulings[mazhab.name]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
