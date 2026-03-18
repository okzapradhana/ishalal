import { landAnimals, seaAnimals, allAnimals } from "./animals";

/**
 * Test: Unique Animal IDs
 *
 * This test verifies that all animals in the combined dataset have unique IDs.
 * Duplicate IDs cause React "encountered two children with the same key" errors
 * when rendering the AnimalTable component.
 *
 * Bug: Sea animals originally had IDs 1-18, duplicating land animals' IDs 1-17.
 * Fix: Sea animals now use IDs 101-118 to ensure uniqueness across allAnimals.
 */

function findDuplicateIds(ids: number[]): { id: number; count: number }[] {
  const idCount = new Map<number, number>();

  for (const id of ids) {
    idCount.set(id, (idCount.get(id) || 0) + 1);
  }

  const duplicates: { id: number; count: number }[] = [];
  for (const [id, count] of idCount.entries()) {
    if (count > 1) {
      duplicates.push({ id, count });
    }
  }

  return duplicates;
}

describe("Animal Data", () => {
  describe("Unique IDs", () => {
    it("should have unique IDs within land animals", () => {
      const landIds = landAnimals.map((a) => a.id);
      const duplicates = findDuplicateIds(landIds);

      expect(duplicates).toEqual([]);
    });

    it("should have unique IDs within sea animals", () => {
      const seaIds = seaAnimals.map((a) => a.id);
      const duplicates = findDuplicateIds(seaIds);

      expect(duplicates).toEqual([]);
    });

    it("should have unique IDs across all animals (no overlap between land and sea)", () => {
      const allIds = allAnimals.map((a) => a.id);
      const duplicates = findDuplicateIds(allIds);

      if (duplicates.length > 0) {
        console.error(
          `Duplicate IDs found: ${duplicates
            .map((d) => `ID ${d.id} appears ${d.count} times`)
            .join("; ")}`
        );
      }

      expect(duplicates).toEqual([]);
    });
  });

  describe("Data Integrity", () => {
    it("should have correct total count of animals", () => {
      expect(landAnimals.length).toBe(17);
      expect(seaAnimals.length).toBe(18);
      expect(allAnimals.length).toBe(35);
    });

    it("should have all animals with required fields", () => {
      for (const animal of allAnimals) {
        expect(animal.id).toBeDefined();
        expect(animal.name).toBeDefined();
        expect(animal.type).toBeDefined();
        expect(animal.rulings).toBeDefined();
      }
    });
  });
});
