"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Receipt, Calculator, User, FileText, TrendingUp, Download, Share2 } from 'lucide-react';

export default function TaxCalculator() {
  const [grossIncome, setGrossIncome] = useState<string>('50000000');
  const [dependents, setDependents] = useState<string>('0');
  const [socialInsurance, setSocialInsurance] = useState<string>('4500000');
  
  const [results, setResults] = useState({
    taxableIncome: 0,
    personalDeduction: 0,
    dependentDeduction: 0,
    taxAmount: 0,
    netIncome: 0,
    taxBrackets: [] as Array<{bracket: string, rate: number, amount: number, taxableAmount: number}>
  });

  const calculateTax = () => {
    const income = parseFloat(grossIncome) || 0;
    const deps = parseInt(dependents) || 0;
    const insurance = parseFloat(socialInsurance) || 0;

    if (income <= 0) {
      setResults({
        taxableIncome: 0,
        personalDeduction: 0,
        dependentDeduction: 0,
        taxAmount: 0,
        netIncome: 0,
        taxBrackets: []
      });
      return;
    }

    // Tax brackets for Vietnam 2025
    const taxBrackets = [
      { min: 0, max: 5000000, rate: 0.05 },
      { min: 5000000, max: 10000000, rate: 0.10 },
      { min: 10000000, max: 18000000, rate: 0.15 },
      { min: 18000000, max: 32000000, rate: 0.20 },
      { min: 32000000, max: 52000000, rate: 0.25 },
      { min: 52000000, max: 80000000, rate: 0.30 },
      { min: 80000000, max: Infinity, rate: 0.35 }
    ];

    const personalDeduction = 11000000; // 11 million VND per month
    const dependentDeduction = deps * 4400000; // 4.4 million per dependent
    const totalDeductions = personalDeduction + dependentDeduction + insurance;
    const taxableIncome = Math.max(0, income - totalDeductions);

    let totalTax = 0;
    let remainingIncome = taxableIncome;
    const bracketDetails: Array<{bracket: string, rate: number, amount: number, taxableAmount: number}> = [];

    for (let i = 0; i < taxBrackets.length; i++) {
      const bracket = taxBrackets[i];
      if (remainingIncome <= 0) break;

      const bracketSize = bracket.max - bracket.min;
      const taxableInThisBracket = Math.min(remainingIncome, bracketSize);
      const taxForThisBracket = taxableInThisBracket * bracket.rate;

      if (taxableInThisBracket > 0) {
        bracketDetails.push({
          bracket: `${formatCurrency(bracket.min)} - ${bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}`,
          rate: bracket.rate * 100,
          amount: taxForThisBracket,
          taxableAmount: taxableInThisBracket
        });

        totalTax += taxForThisBracket;
        remainingIncome -= taxableInThisBracket;
      }
    }

    const netIncome = income - totalTax - insurance;

    setResults({
      taxableIncome,
      personalDeduction,
      dependentDeduction,
      taxAmount: totalTax,
      netIncome,
      taxBrackets: bracketDetails
    });
  };

  useEffect(() => {
    calculateTax();
  }, [grossIncome, dependents, socialInsurance]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const getTaxRate = (): number => {
    if (results.taxableIncome === 0) return 0;
    return (results.taxAmount / results.taxableIncome) * 100;
  };

  const getEffectiveTaxRate = (): number => {
    const income = parseFloat(grossIncome) || 0;
    if (income === 0) return 0;
    return (results.taxAmount / income) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tính Thuế TNCN</h1>
                  <p className="text-sm text-gray-600">Tính toán thuế thu nhập cá nhân 2025</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Thông tin thu nhập</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Thu nhập gần tháng (VND)
                  </label>
                  <input
                    type="text"
                    value={formatNumber(parseFloat(grossIncome) || 0)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setGrossIncome(value);
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium"
                    placeholder="50,000,000"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Thu nhập trước thuế và các khoản trừ
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Số người phụ thuộc
                  </label>
                  <input
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                    min="0"
                    max="20"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium"
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Mỗi người phụ thuộc giảm trừ 4,4 triệu VND
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bảo hiểm xã hội (VND)
                  </label>
                  <input
                    type="text"
                    value={formatNumber(parseFloat(socialInsurance) || 0)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setSocialInsurance(value);
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all text-lg font-medium"
                    placeholder="4,500,000"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Thường là 10.5% thu nhập cơ sở
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">💡 Lưu ý quan trọng</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Áp dụng theo Luật Thuế TNCN 2025</li>
                      <li>• Giảm trừ gia cảnh: 11 triệu/tháng</li>
                      <li>• Người phụ thuộc: 4.4 triệu/người</li>
                      <li>• Kết quả chỉ mang tính chất tham khảo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-green-100 text-sm font-medium">Thu nhập ròng</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{formatCurrency(results.netIncome)}</p>
                    <p className="text-green-100 text-sm">
                      Sau thuế và bảo hiểm
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <span className="text-red-100 text-sm font-medium">Thuế phải nộp</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold">{formatCurrency(results.taxAmount)}</p>
                    <p className="text-red-100 text-sm">
                      Thuế suất: {getEffectiveTaxRate().toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Chi tiết tính thuế</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Thu nhập chịu thuế</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(results.taxableIncome)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Giảm trừ bản thân</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(results.personalDeduction)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Giảm trừ người phụ thuộc</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(results.dependentDeduction)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Thuế suất trung bình</p>
                      <p className="text-lg font-bold text-gray-900">{getTaxRate().toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Brackets */}
              {results.taxBrackets.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Các bậc thuế áp dụng</h3>
                  
                  <div className="space-y-4">
                    {results.taxBrackets.map((bracket, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-4 h-4 rounded-full ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-yellow-500' : 
                                index === 2 ? 'bg-orange-500' : 
                                index === 3 ? 'bg-red-400' : 
                                index === 4 ? 'bg-red-500' : 
                                index === 5 ? 'bg-red-600' : 'bg-red-700'
                              }`}></div>
                              <span className="font-semibold text-gray-800">Bậc {index + 1}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                                {bracket.rate}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Khoảng: {bracket.bracket}</p>
                            <p className="text-sm text-gray-600">
                              Thu nhập chịu thuế: <span className="font-medium">{formatCurrency(bracket.taxableAmount)}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(bracket.amount)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">Tổng thuế phải nộp</p>
                        <p className="text-sm text-gray-600">Thuế suất trung bình: {getTaxRate().toFixed(2)}%</p>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.taxAmount)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tax Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Thông tin thuế suất 2025</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Bậc thuế TNCN</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-green-50 rounded">
                        <span>Đến 5 triệu</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-yellow-50 rounded">
                        <span>Từ 5-10 triệu</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-orange-50 rounded">
                        <span>Từ 10-18 triệu</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-50 rounded">
                        <span>Từ 18-32 triệu</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-100 rounded">
                        <span>Từ 32-52 triệu</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-200 rounded">
                        <span>Từ 52-80 triệu</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-300 rounded">
                        <span>Trên 80 triệu</span>
                        <span className="font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Mức giảm trừ</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span>Giảm trừ bản thân</span>
                          <span className="font-bold text-blue-600">11,000,000 VND</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Áp dụng cho mọi người nộp thuế</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span>Người phụ thuộc</span>
                          <span className="font-bold text-green-600">4,400,000 VND</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Mỗi người phụ thuộc hợp lệ</p>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span>Bảo hiểm xã hội</span>
                          <span className="font-bold text-yellow-600">~10.5%</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Của mức lương đóng bảo hiểm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}