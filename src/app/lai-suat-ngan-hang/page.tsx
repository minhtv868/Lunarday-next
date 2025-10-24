"use client";
import { useState } from "react";
import data from "@/data/laisuat.json";

export default function LaiSuatPage() {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = parseFloat((a.rates as Record<string, string>)[sortColumn]?.replace("%", "") || "-1");
    const bValue = parseFloat((b.rates as Record<string, string>)[sortColumn]?.replace("%", "") || "-1");
    
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  const columns = [
    { label: "Không kỳ hạn", key: "0m" },
    { label: "1 tháng", key: "1m" },
    { label: "3 tháng", key: "3m" },
    { label: "6 tháng", key: "6m" },
    { label: "9 tháng", key: "9m" },
    { label: "12 tháng", key: "12m" },
    { label: "18 tháng", key: "18m" },
    { label: "24 tháng", key: "24m" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900">Lãi Suất Ngân Hàng</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">Ngân hàng</th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="py-4 px-6 text-center font-semibold text-sm uppercase tracking-wide cursor-pointer"
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}{" "}
                    {sortColumn === col.key && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={item.bank}
                  className={`border-t border-gray-200 hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-6 text-left font-medium text-gray-900">{item.bank}</td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="py-4 px-6 text-center text-gray-800"
                    >
                    {item.rates[col.key as keyof typeof item.rates] || "-"}

                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
