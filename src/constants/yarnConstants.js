export const USAGE_TYPES = [
  { value: 0, label: "Varp" },
  { value: 1, label: "Inslag" },
  { value: 2, label: "Supplementär" },
  { value: 3, label: "Övrigt" }
];

export const FIBRE_TYPES = [
  { value: 0, label: "Ull" },
  { value: 1, label: "Bomull" },
  { value: 2, label: "Siden" },
  { value: 3, label: "Linne" },
  { value: 4, label: "Syntetisk" },
  { value: 5, label: "Blandad" },
  { value: 6, label: "Övrigt" }
];
export const defaultWarp = {
        usageType: 0,
        brand: "",
        color: "",
        colorCode: "",
        dyeLot: "",
        fibreType: 0,
        ply: "",
        thicknessNM: "",
        notes: "",
        weightPerSkeinGrams: 100,
        lengthPerSkeinMeters: null,
    }
    export const defaultWeft = {
        usageType: 1,
        brand: "",
        color: "",
        colorCode: "",
        dyeLot: "",
        fibreType: 0,
        ply: "",
        thicknessNM: "",
        notes: "",
        weightPerSkeinGrams: 100,
        lengthPerSkeinMeters: null,
    }
export const YARN_VALIDATION_CONSTANTS = {
  PlyMin: 1,
  PlyMax: 10,
  ThicknessMin: 5,
  ThicknessMax: 50
}