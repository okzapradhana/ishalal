export type Language = "en" | "id";

export const translations = {
  en: {
    // Header
    title: "Is Halal",
    subtitle: "Filter halal/haram rulings by Mazhab and animal type",

    // Filters
    filters: "Filters",
    mazhab: "Mazhab",
    animalType: "Animal Type",
    rulingStatus: "Ruling Status",

    // Mazhab dropdown
    allMazhab: "All Mazhab",
    selected: "selected",

    // Animal Type dropdown
    allAnimals: "All Animals",
    landAnimals: "Land Animals",
    seaAnimals: "Sea Animals",
    landAndSea: "Land & Sea",

    // Status dropdown
    allStatus: "All Status",
    halal: "Halal",
    haram: "Haram",
    makruh: "Makruh",

    // Search
    searchPlaceholder: "Search animal...",

    // Stats
    showing: "Showing",
    of: "of",
    animals: "animals",

    // Table headers
    no: "No",
    animalName: "Animal Name",
    type: "Type",
    land: "Land",
    sea: "Sea",
    landAndSeaShort: "Land & Sea",

    // Empty state
    noAnimalsMatch: "No animals match the selected filters.",

    // Footer
    sources: "Sources",
    landAnimalsSources: "Land Animals",
    seaAnimalsSources: "Sea Animals",
    credit: "Curated by:",
  },
  id: {
    // Header
    title: "Is Halal",
    subtitle: "Filter hukum halal/haram berdasarkan Mazhab dan jenis hewan",

    // Filters
    filters: "Filter",
    mazhab: "Mazhab",
    animalType: "Jenis Hewan",
    rulingStatus: "Status Hukum",

    // Mazhab dropdown
    allMazhab: "Semua Mazhab",
    selected: "dipilih",

    // Animal Type dropdown
    allAnimals: "Semua Hewan",
    landAnimals: "Hewan Darat",
    seaAnimals: "Hewan Laut",
    landAndSea: "Darat & Laut",

    // Status dropdown
    allStatus: "Semua Status",
    halal: "Halal",
    haram: "Haram",
    makruh: "Makruh",

    // Search
    searchPlaceholder: "Cari hewan...",

    // Stats
    showing: "Menampilkan",
    of: "dari",
    animals: "hewan",

    // Table headers
    no: "No",
    animalName: "Nama Hewan",
    type: "Jenis",
    land: "Darat",
    sea: "Laut",
    landAndSeaShort: "Darat & Laut",

    // Empty state
    noAnimalsMatch: "Tidak ada hewan yang sesuai dengan filter yang dipilih.",

    // Footer
    sources: "Sumber",
    landAnimalsSources: "Hewan Darat",
    seaAnimalsSources: "Hewan Laut",
    credit: "Dikurasi oleh:",
  },
};

export type TranslationKey = keyof typeof translations.en;

export function useTranslation(language: Language) {
  return translations[language];
}
