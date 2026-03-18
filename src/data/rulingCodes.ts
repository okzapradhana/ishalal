import { Language } from "./translations";

export interface RulingCode {
  code: string;
  display: string;
  category: "HALAL" | "HARAM" | "MAKRUH";
}

// Mapping of full ruling strings to abbreviated codes
export const rulingAbbreviations: Record<string, RulingCode> = {
  // Simple rulings - pass through
  "HALAL": {
    code: "HALAL",
    display: "HALAL",
    category: "HALAL",
  },
  "HARAM": {
    code: "HARAM",
    display: "HARAM",
    category: "HARAM",
  },
  "MAKRUH": {
    code: "MAKRUH",
    display: "MAKRUH",
    category: "MAKRUH",
  },
  // HALAL with conditions
  "HALAL, ada yang menghukumi MAKRUH": {
    code: "HALAL*",
    display: "HALAL*",
    category: "HALAL",
  },
  "HALAL dan ada yang mengharamkan": {
    code: "HALAL**",
    display: "HALAL**",
    category: "HALAL",
  },
  "HALAL (jika tidak ada racun/bahaya pada dagingnya)": {
    code: "HALAL***",
    display: "HALAL***",
    category: "HALAL",
  },
  // Mixed rulings
  "Makruh/Haram": {
    code: "MAKRUH~",
    display: "MAKRUH~",
    category: "MAKRUH",
  },
  "Haram/Makruh": {
    code: "MAKRUH~",
    display: "MAKRUH~",
    category: "MAKRUH",
  },
};

// Footnote explanations by language
export const footnoteExplanations: Record<string, Record<Language, string>> = {
  "HALAL*": {
    en: "Halal, but some scholars consider it Makruh (disliked)",
    id: "Halal, tetapi sebagian ulama menganggap Makruh",
  },
  "HALAL**": {
    en: "Halal, but some scholars forbid it",
    id: "Halal, tetapi sebagian ulama mengharamkan",
  },
  "HALAL***": {
    en: "Halal, if there is no poison/danger in the meat",
    id: "Halal, jika tidak ada racun/bahaya pada dagingnya",
  },
  "MAKRUH~": {
    en: "Scholars disagree between Makruh and Haram",
    id: "Ulama berselisih antara Makruh dan Haram",
  },
};

/**
 * Get abbreviated ruling for display
 * Falls back to original status if no abbreviation found
 */
export function getAbbreviatedRuling(status: string | null): { display: string; category: "HALAL" | "HARAM" | "MAKRUH"; hasFootnote: boolean } {
  if (!status) {
    return { display: "No Ruling", category: "HALAL", hasFootnote: false };
  }

  const abbreviated = rulingAbbreviations[status];
  if (abbreviated) {
    return {
      display: abbreviated.display,
      category: abbreviated.category,
      hasFootnote: abbreviated.display.includes("*") || abbreviated.display.includes("~"),
    };
  }

  // Fallback for unknown rulings - try to determine category
  const normalized = status.toUpperCase();
  if (normalized.includes("HALAL") && !normalized.includes("MAKRUH")) {
    return { display: "HALAL", category: "HALAL", hasFootnote: false };
  }
  if (normalized.includes("HARAM")) {
    return { display: "HARAM", category: "HARAM", hasFootnote: false };
  }
  if (normalized.includes("MAKRUH")) {
    return { display: "MAKRUH", category: "MAKRUH", hasFootnote: false };
  }

  // Last resort - return original
  return { display: status, category: "HALAL", hasFootnote: false };
}

/**
 * Get footnote explanation for a code
 */
export function getFootnoteExplanation(code: string, language: Language): string | null {
  return footnoteExplanations[code]?.[language] || null;
}
