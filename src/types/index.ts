export type Mazhab = "Ja'fari" | "Hanafi" | "Maliki" | "Syafi'i" | "Hanbali";

export type RulingStatus =
  | "HALAL"
  | "HARAM"
  | "MAKRUH"
  | "Haram/Makruh"
  | "Makruh/Haram"
  | "HALAL dan ada yang mengharamkan"
  | "HALAL, ada yang menghukumi MAKRUH"
  | "HALAL (jika tidak ada racun/bahaya pada dagingnya)"
  | null;

export interface AnimalRuling {
  mazhab: Mazhab;
  status: RulingStatus;
}

export interface Animal {
  id: number;
  name: string;
  type: "land" | "sea" | "both";
  rulings: Record<Mazhab, RulingStatus>;
}

export interface FilterState {
  mazhab: Mazhab[] | "all";
  animalType: "all" | "land" | "sea" | "both";
  status: "all" | "HALAL" | "HARAM" | "MAKRUH";
}
