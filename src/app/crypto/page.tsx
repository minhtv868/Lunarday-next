'use client';

import { useEffect, useState } from 'react';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoPage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCryptoData() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptos(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu tiền ảo:', error);
        setLoading(false);
      }
    }
    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Giá Tiền Ảo (USD)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {cryptos.map((crypto) => (
          <div
            key={crypto.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
            <p className="text-lg">Giá: ${crypto.current_price.toFixed(2)}</p>
            <p
              className={`text-lg ${
                crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              24h: {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}