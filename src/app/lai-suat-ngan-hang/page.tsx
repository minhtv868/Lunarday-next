"use client";
import { useState } from "react";
import { TrendingUp, ArrowUpDown, Percent, Building2, ChevronDown, Filter } from "lucide-react";
import data from "@/data/laisuat.json";

export default function LaiSuatPage() {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTerm, setSelectedTerm] = useState("all");

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
    { label: "Không kỳ hạn", key: "0m", mobile: "KKH" },
    { label: "1 tháng", key: "1m", mobile: "1T" },
    { label: "3 tháng", key: "3m", mobile: "3T" },
    { label: "6 tháng", key: "6m", mobile: "6T" },
    { label: "9 tháng", key: "9m", mobile: "9T" },
    { label: "12 tháng", key: "12m", mobile: "12T" },
    { label: "18 tháng", key: "18m", mobile: "18T" },
    { label: "24 tháng", key: "24m", mobile: "24T" },
  ];

  const getHighestRate = (rates: Record<string, string>) => {
    const values = Object.values(rates).map(r => parseFloat(r.replace("%", "")));
    return Math.max(...values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-4 shadow-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Percent className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Lãi Suất Ngân Hàng</h1>
              <p className="text-blue-100 mt-1">Cập nhật: 05/11/2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Stats Cards - Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Cao nhất</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.max(...data.flatMap(d => Object.values(d.rates).map(r => parseFloat(r.replace("%", ""))))).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Số ngân hàng</p>
                <p className="text-2xl font-bold text-blue-600">{data.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Kỳ hạn</p>
                <p className="text-2xl font-bold text-purple-600">{columns.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Dropdown - Mobile */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 md:hidden">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Lọc theo kỳ hạn</label>
          <div className="relative">
            <select 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value="all">Tất cả kỳ hạn</option>
              {columns.map(col => (
                <option key={col.key} value={col.key}>{col.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="py-4 px-6 text-left font-semibold sticky left-0 bg-gradient-to-r from-blue-600 to-indigo-600 z-10">
                    Ngân hàng
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="py-4 px-4 text-center font-semibold cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {col.label}
                        {sortColumn === col.key ? (
                          <span className="text-yellow-300">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          <ArrowUpDown className="w-4 h-4 opacity-50" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr
                    key={item.bank}
                    className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6 font-semibold text-gray-900 sticky left-0 bg-inherit">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        {item.bank}
                      </div>
                    </td>
                    {columns.map((col) => {
                      const rate = item.rates[col.key as keyof typeof item.rates];
                      const value = parseFloat(rate?.replace("%", "") || "0");
                      const highest = getHighestRate(item.rates);
                      const isHighest = value === highest && value > 0;
                      
                      return (
                        <td
                          key={col.key}
                          className="py-4 px-4 text-center"
                        >
                          <span className={`inline-block px-3 py-1 rounded-lg font-semibold ${
                            isHighest 
                              ? "bg-green-100 text-green-700" 
                              : value >= 5 
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-700"
                          }`}>
                            {rate || "-"}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {sortedData.map((item) => (
            <div key={item.bank} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.bank}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {columns
                    .filter(col => selectedTerm === "all" || col.key === selectedTerm)
                    .map((col) => {
                      const rate = item.rates[col.key as keyof typeof item.rates];
                      const value = parseFloat(rate?.replace("%", "") || "0");
                      const highest = getHighestRate(item.rates);
                      const isHighest = value === highest && value > 0;
                      
                      return (
                        <div 
                          key={col.key}
                          className={`p-3 rounded-xl border-2 ${
                            isHighest 
                              ? "bg-green-50 border-green-200" 
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <p className="text-xs text-gray-600 mb-1">{col.label}</p>
                          <p className={`text-xl font-bold ${
                            isHighest ? "text-green-700" : "text-gray-900"
                          }`}>
                            {rate || "-"}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <p className="text-gray-700 text-sm text-center">
            <span className="font-semibold">Lưu ý:</span> Lãi suất có thể thay đổi theo từng thời điểm và chương trình khuyến mãi. 
            Vui lòng liên hệ trực tiếp ngân hàng để biết thông tin chính xác nhất.
          </p>
        </div>
      </div>
    </div>
  );
}