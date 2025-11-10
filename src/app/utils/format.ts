// utils/format.ts
export const formatNumber = (value: string | number): string => {
  if (!value) return "";
  return new Intl.NumberFormat("vi-VN").format(Number(value));
};

export const parseNumber = (value: string): number => {
  return Number(value.replace(/\D/g, "")) || 0;
};

// export const formatDate = (date: Date | string, locale = "vi-VN"): string => {
//   const d = typeof date === "string" ? new Date(date) : date;
//   return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
// };
export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatCurrency = (value: number, currency = "VND"): string => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency }).format(value);
};
