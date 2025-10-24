"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Scale,
  CoreScaleOptions,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Interface cho dữ liệu giá vàng
interface GoldPrice {
  type: string;
  buyPrice: number;
  sellPrice: number;
}

// Interface cho dữ liệu biểu đồ
interface ChartData {
  labels: string[];
  prices: number[];
}

// Dữ liệu mẫu (giả lập từ API)
const mockGoldPrices: GoldPrice[] = [
  { type: "Vàng SJC", buyPrice: 7600000, sellPrice: 7800000 },
  { type: "Vàng 9999", buyPrice: 7500000, sellPrice: 7700000 },
  { type: "Vàng 18K", buyPrice: 5500000, sellPrice: 5700000 },
];

const mockChartData: ChartData = {
  labels: ["01/06", "02/06", "03/06", "04/06", "05/06", "06/06", "07/06"],
  prices: [7600000, 7620000, 7580000, 7650000, 7700000, 7680000, 7750000],
};

export default function GoldPricePage() {
  const [goldPrices, setGoldPrices] = useState<GoldPrice[]>([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    prices: [],
  });

  // Fetch dữ liệu (thay bằng API thật nếu có)
  useEffect(() => {
    // Giả lập fetch dữ liệu từ API
    setGoldPrices(mockGoldPrices);
    setChartData(mockChartData);

    // Nếu có API thật, dùng axios:
    /*
    async function fetchData() {
      const response = await axios.get(`${process.env.API_URL}/Gold`);
      // Chuyển đổi dữ liệu nếu API trả về string
      const prices = response.data.prices.map((item: any) => ({
        type: item.type,
        buyPrice: Number(item.buyPrice),
        sellPrice: Number(item.sellPrice),
      }));
      const chart = {
        labels: response.data.chart.labels,
        prices: response.data.chart.prices.map(Number),
      };
      setGoldPrices(prices);
      setChartData(chart);
    }
    fetchData();
    */
  }, []);

  // Cấu hình biểu đồ
  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Giá vàng SJC (VND/chỉ)",
        data: chartData.prices,
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Danh sách giá vàng */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Bảng Giá Vàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goldPrices.map((gold, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-yellow-600">
                  {gold.type}
                </h3>
                <p className="mt-2 text-gray-600">
                  Giá mua:{" "}
                  <span className="font-semibold">
                    {gold.buyPrice.toLocaleString()} VND/chỉ
                  </span>
                </p>
                <p className="mt-1 text-gray-600">
                  Giá bán:{" "}
                  <span className="font-semibold">
                    {gold.sellPrice.toLocaleString()} VND/chỉ
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>
         
        <div className="p-4">
          <h1 className="text-xl font-semibold mb-4">
            Biểu đồ giá vàng thế giới
          </h1>

          <div className="w-full h-[500px]">
            <iframe
              src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_cba3e&symbol=OANDA%3AXAUUSD&interval=60&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Asia%2FHo_Chi_Minh&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=vi"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="Biểu đồ giá vàng"
            ></iframe>
          </div>
        </div>

        {/* Biểu đồ giá vàng */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Biểu Đồ Giá Vàng (7 ngày)
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Line
              data={chartConfig}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Giá vàng SJC theo thời gian" },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      // Sửa kiểu callback để chấp nhận string | number
                      callback: function (
                        this: Scale<CoreScaleOptions>,
                        tickValue: string | number,
                       
                      ): string {
                        const value =
                          typeof tickValue === "string"
                            ? parseFloat(tickValue)
                            : tickValue;
                        return `${(value / 1000000).toFixed(1)}M VND`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
