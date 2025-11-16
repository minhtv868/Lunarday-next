"use client";

import { TrendingUp, RefreshCw, AlertCircle, ArrowUpRight, ArrowDownRight, Clock, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

interface Currency {
  code: string;
  name: string;
  flag: string;
  color: string;
}

export default function TyGiaHomNayClient() {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [amount, setAmount] = useState<string>('1000000');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencies: Currency[] = [
    { code: 'USD', name: 'Đô la Mỹ', flag: '🇺🇸', color: 'from-blue-500 to-blue-600' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', color: 'from-indigo-500 to-indigo-600' },
    { code: 'GBP', name: 'Bảng Anh', flag: '🇬🇧', color: 'from-purple-500 to-purple-600' },
    { code: 'JPY', name: 'Yên Nhật', flag: '🇯🇵', color: 'from-red-500 to-red-600' },
    { code: 'AUD', name: 'Đô la Úc', flag: '🇦🇺', color: 'from-yellow-500 to-yellow-600' },
    { code: 'CAD', name: 'Đô la Canada', flag: '🇨🇦', color: 'from-red-400 to-red-500' },
    { code: 'CHF', name: 'Franc Thụy Sĩ', flag: '🇨🇭', color: 'from-gray-500 to-gray-600' },
    { code: 'CNY', name: 'Nhân dân tệ', flag: '🇨🇳', color: 'from-red-600 to-yellow-500' },
    { code: 'SGD', name: 'Đô la Singapore', flag: '🇸🇬', color: 'from-pink-500 to-pink-600' },
    { code: 'THB', name: 'Baht Thái Lan', flag: '🇹🇭', color: 'from-orange-500 to-orange-600' },
    { code: 'KRW', name: 'Won Hàn Quốc', flag: '🇰🇷', color: 'from-blue-400 to-blue-500' },
    { code: 'MYR', name: 'Ringgit Malaysia', flag: '🇲🇾', color: 'from-yellow-400 to-red-500' },
  ];

  const fetchRates = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/VND');
      
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu tỷ giá');
      }
      
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCurrency && rates && rates[selectedCurrency]) {
      const baseRate = calculateVNDRate(rates[selectedCurrency]);
      const amountNum = parseFloat(amount.replace(/[^\d]/g, '')) || 0;
      setConvertedAmount(amountNum / baseRate);
    }
  }, [amount, selectedCurrency, rates]);

  const calculateVNDRate = (foreignRate: number): number => {
    if (!foreignRate || foreignRate === 0) return 0;
    return Math.round(1 / foreignRate);
  };

  const calculateBuyRate = (baseRate: number): number => {
    return Math.round(baseRate * 0.98);
  };

  const calculateSellRate = (baseRate: number): number => {
    return Math.round(baseRate * 1.02);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const formatCurrency = (num: number, code: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const handleAmountChange = (value: string): void => {
    const numbers = value.replace(/[^\d]/g, '');
    setAmount(numbers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-xl mb-4">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Tỷ Giá Hôm Nay
          </h1>
          <p className="text-gray-600 text-lg">Cập nhật tỷ giá ngoại tệ theo thời gian thực</p>
        </div>

        {/* Quick Converter */}
        {!error && rates && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Chuyển đổi nhanh</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền (VND)</label>
                <input
                  type="text"
                  value={formatNumber(parseFloat(amount) || 0)}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium"
                  placeholder="1,000,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chuyển sang</label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg font-medium"
                >
                  <option value="">Chọn ngoại tệ</option>
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kết quả</label>
                <div className="w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-lg font-bold text-green-700">
                  {selectedCurrency ? formatCurrency(convertedAmount, selectedCurrency) : '---'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Cập nhật: {lastUpdate.toLocaleString('vi-VN')}
              </span>
            </div>
            
            <button
              onClick={fetchRates}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Lỗi tải dữ liệu</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {loading && !rates ? (
            <div className="text-center py-20">
              <RefreshCw className="w-16 h-16 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Đang tải dữ liệu tỷ giá...</p>
            </div>
          ) : rates ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      <th className="px-6 py-4 text-left rounded-tl-xl font-semibold">Ngoại tệ</th>
                      <th className="px-6 py-4 text-right font-semibold">Mua vào</th>
                      <th className="px-6 py-4 text-right font-semibold">Bán ra</th>
                      <th className="px-6 py-4 text-right rounded-tr-xl font-semibold">Chuyển khoản</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currencies.map((currency) => {
                      const baseRate = calculateVNDRate(rates[currency.code] || 0);
                      const buyRate = calculateBuyRate(baseRate);
                      const sellRate = calculateSellRate(baseRate);

                      return (
                        <tr key={currency.code} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-4xl">{currency.flag}</span>
                              <div>
                                <div className="font-bold text-gray-800 text-lg">{currency.code}</div>
                                <div className="text-sm text-gray-500">{currency.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ArrowDownRight className="w-4 h-4 text-green-500" />
                              <span className="font-semibold text-gray-700">{formatNumber(buyRate)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ArrowUpRight className="w-4 h-4 text-red-500" />
                              <span className="font-semibold text-gray-700">{formatNumber(sellRate)}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-lg font-bold border border-green-200">
                              {formatNumber(baseRate)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {currencies.map((currency) => {
                  const baseRate = calculateVNDRate(rates[currency.code] || 0);
                  const buyRate = calculateBuyRate(baseRate);
                  const sellRate = calculateSellRate(baseRate);

                  return (
                    <div key={currency.code} className="border-2 border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{currency.flag}</span>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 text-lg">{currency.code}</div>
                          <div className="text-sm text-gray-500">{currency.name}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <ArrowDownRight className="w-3 h-3" />
                            Mua vào
                          </div>
                          <div className="font-bold text-green-700 text-sm">{formatNumber(buyRate)}</div>
                        </div>
                        
                        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                          <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                            <ArrowUpRight className="w-3 h-3" />
                            Bán ra
                          </div>
                          <div className="font-bold text-red-700 text-sm">{formatNumber(sellRate)}</div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="text-xs text-gray-600 mb-1">CK</div>
                          <div className="font-bold text-blue-700 text-sm">{formatNumber(baseRate)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                <div className="flex gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Lưu ý quan trọng:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tỷ giá được tính toán dựa trên tỷ giá thị trường quốc tế</li>
                      <li>• Giá mua vào thấp hơn 2%, giá bán ra cao hơn 2% so với giá chuyển khoản</li>
                      <li>• Dữ liệu tự động cập nhật mỗi 5 phút</li>
                      <li>• Vui lòng liên hệ ngân hàng để biết tỷ giá chính thức và chính xác</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}