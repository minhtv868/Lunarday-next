import { Coins, TrendingUp, TrendingDown, RefreshCw, Clock } from 'lucide-react';

export default function GiaVangHomNayClient() {
  // Mock data - replace with real API data
  const goldPrices = [
    {
      type: 'SJC',
      unit: '1 lượng',
      buy: '84.50',
      sell: '86.50',
      change: '+0.5',
      trend: 'up'
    },
    {
      type: 'PNJ',
      unit: '1 lượng',
      buy: '84.20',
      sell: '86.20',
      change: '+0.3',
      trend: 'up'
    },
    {
      type: 'DOJI',
      unit: '1 lượng',
      buy: '84.30',
      sell: '86.30',
      change: '-0.2',
      trend: 'down'
    },
    {
      type: 'Bảo Tín Minh Châu',
      unit: '1 lượng',
      buy: '84.40',
      sell: '86.40',
      change: '+0.4',
      trend: 'up'
    }
  ];

  const worldGold = {
    price: '2,045.50',
    change: '+12.30',
    percent: '+0.61'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Coins className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Giá Vàng Hôm Nay
                </h1>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Cập nhật lúc 09:30 - 05/11/2025
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
              <RefreshCw className="w-4 h-4" />
              Làm mới
            </button>
          </div>
        </div>

        {/* World Gold Price */}
        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl shadow-xl p-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-yellow-100 text-sm font-medium mb-1">GIÁ VÀNG THẾ GIỚI</p>
              <p className="text-5xl font-bold">${worldGold.price}</p>
              <p className="text-yellow-100 mt-1">USD/Ounce</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <TrendingUp className="w-6 h-6" />
                <span className="text-3xl font-bold">{worldGold.change}</span>
              </div>
              <p className="text-yellow-100 text-xl mt-1">({worldGold.percent}%)</p>
            </div>
          </div>
        </div>

        {/* Domestic Gold Prices */}
        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Giá Vàng Trong Nước</h2>
            <p className="text-yellow-100 mt-1">Đơn vị: Triệu đồng</p>
          </div>

          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-amber-200">
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Loại vàng</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Đơn vị</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">Mua vào</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">Bán ra</th>
                    <th className="text-right py-4 px-4 text-gray-700 font-semibold">Thay đổi</th>
                  </tr>
                </thead>
                <tbody>
                  {goldPrices.map((item, index) => (
                    <tr 
                      key={index}
                      className="border-b border-amber-100 hover:bg-amber-50 transition-colors"
                    >
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <Coins className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-800">{item.type}</span>
                        </div>
                      </td>
                      <td className="py-5 px-4 text-gray-600">{item.unit}</td>
                      <td className="py-5 px-4 text-right">
                        <span className="text-lg font-bold text-blue-600">{item.buy}</span>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <span className="text-lg font-bold text-red-600">{item.sell}</span>
                      </td>
                      <td className="py-5 px-4 text-right">
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                          item.trend === 'up' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">{item.change}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Xu hướng tăng</h3>
            <p className="text-gray-600 text-sm">Giá vàng đang có xu hướng tăng nhẹ trong phiên sáng nay.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Coins className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Thanh khoản tốt</h3>
            <p className="text-gray-600 text-sm">Thị trường giao dịch sôi động với nhiều người mua bán.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Cập nhật realtime</h3>
            <p className="text-gray-600 text-sm">Dữ liệu được cập nhật liên tục trong giờ giao dịch.</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <p className="text-gray-700 text-sm text-center">
            <span className="font-semibold">Lưu ý:</span> Giá vàng chỉ mang tính chất tham khảo. 
            Vui lòng liên hệ trực tiếp các cửa hàng để biết giá chính xác nhất.
          </p>
        </div>
      </div>
    </div>
  );
}