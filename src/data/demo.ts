export type IngredientKind = "liquid" | "powder";

export type DemoIngredient = {
  id: string;
  code: string;
  name: string;
  kind: IngredientKind;
  brixLabel: string;
  acidityLabel: string;
  densityLabel: string;
  custom?: boolean;
};

export const demoIngredients: DemoIngredient[] = [
  {
    id: "ex-orange",
    code: "EX-101",
    name: "Example orange concentrate",
    kind: "liquid",
    brixLabel: "60.0",
    acidityLabel: "2.00%",
    densityLabel: "10.00 lb/gal",
  },
  {
    id: "ex-lemon",
    code: "EX-102",
    name: "Example lemon concentrate",
    kind: "liquid",
    brixLabel: "40.0",
    acidityLabel: "8.00%",
    densityLabel: "10.00 lb/gal",
  },
  {
    id: "ex-apple",
    code: "EX-103",
    name: "Example apple concentrate",
    kind: "liquid",
    brixLabel: "70.0",
    acidityLabel: "1.50%",
    densityLabel: "11.00 lb/gal",
  },
  {
    id: "ex-grape",
    code: "EX-104",
    name: "Example white grape concentrate",
    kind: "liquid",
    brixLabel: "68.0",
    acidityLabel: "1.00%",
    densityLabel: "11.00 lb/gal",
  },
  {
    id: "ex-citric",
    code: "EX-201",
    name: "Example citric acid",
    kind: "powder",
    brixLabel: "—",
    acidityLabel: "—",
    densityLabel: "—",
  },
  {
    id: "ex-color",
    code: "EX-202",
    name: "Example color blend",
    kind: "powder",
    brixLabel: "—",
    acidityLabel: "—",
    densityLabel: "—",
  },
];

export type ExampleAdd = {
  name: string;
  amount: string;
};

export type ExampleBatch = {
  id: string;
  product: string;
  tank: string;
  title: string;
  summary: string;
  volume: string;
  brix: string;
  acidity: string;
  color: string;
  status: string;
  adds: ExampleAdd[];
};

export const exampleLemonade: ExampleBatch = {
  id: "EX-2041",
  product: "Example lemonade",
  tank: "Tank A",
  title: "Example lemonade, Tank A",
  summary: "A finished sample card for a morning citrus blend.",
  volume: "1,240 gal",
  brix: "11.8",
  acidity: "0.92%",
  color: "0.450",
  status: "Example: on spec",
  adds: [
    { name: "Example orange concentrate", amount: "72 gal" },
    { name: "Example lemon concentrate", amount: "18 gal" },
    { name: "Water", amount: "210 gal" },
  ],
};

export const exampleApple: ExampleBatch = {
  id: "EX-2038",
  product: "Example apple juice",
  tank: "Tank C",
  title: "Example apple juice, Tank C",
  summary: "A second sample card, shown beside the lemonade walkthrough.",
  volume: "860 gal",
  brix: "12.2",
  acidity: "0.45%",
  color: "0.280",
  status: "Example: on spec",
  adds: [
    { name: "Example apple concentrate", amount: "64 gal" },
    { name: "Example white grape concentrate", amount: "12 gal" },
    { name: "Water", amount: "180 gal" },
  ],
};

export const dashboardStats = [
  { label: "Batches today", value: "6", hint: "Example count" },
  { label: "Marked on spec", value: "5", hint: "Example count" },
  { label: "Needs a look", value: "1", hint: "Example count" },
  { label: "Volume on the board", value: "8,400 gal", hint: "Example total" },
];

export const weekBars = [
  { day: "Mon", label: "4", width: "40%" },
  { day: "Tue", label: "6", width: "60%" },
  { day: "Wed", label: "5", width: "50%" },
  { day: "Thu", label: "8", width: "80%" },
  { day: "Fri", label: "6", width: "60%" },
  { day: "Sat", label: "2", width: "20%" },
  { day: "Sun", label: "1", width: "12%" },
];

export const tankBoard = [
  { tank: "Tank A", product: "Example lemonade", volume: "1,240 gal", state: "On spec" },
  { tank: "Tank B", product: "Example berry blend", volume: "540 gal", state: "Review" },
  { tank: "Tank C", product: "Example apple juice", volume: "860 gal", state: "On spec" },
  { tank: "Tank D", product: "Empty", volume: "—", state: "Open" },
];

export const recentBatches = [
  { id: "EX-2041", product: "Example lemonade", volume: "1,240 gal", state: "On spec" },
  { id: "EX-2038", product: "Example apple juice", volume: "860 gal", state: "On spec" },
  { id: "EX-2033", product: "Example berry blend", volume: "540 gal", state: "Review" },
  { id: "EX-2026", product: "Example grape soda base", volume: "1,100 gal", state: "On spec" },
];

export const summaryRows = [
  { spec: "Volume", target: "1,000–1,500 gal", reading: "1,240 gal", state: "In range" },
  { spec: "Brix", target: "11.0–12.0", reading: "11.8", state: "In range" },
  { spec: "Acidity", target: "0.80–1.00%", reading: "0.92%", state: "In range" },
  { spec: "Color reading", target: "0.400–0.500", reading: "0.450", state: "In range" },
];
