export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  pill: 999,
} as const;

export const shadows = {
  card: { boxShadow: "0px 4px 18px rgba(38, 40, 59, 0.05)" },
  floating: { boxShadow: "0px 8px 30px rgba(78, 48, 110, 0.12)" },
  selected: { boxShadow: "0px 5px 12px rgba(121, 82, 198, 0.18)" },
} as const;
