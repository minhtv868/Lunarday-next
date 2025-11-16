'use client';
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

type ColorType = 'blue' | 'red' | 'amber' | 'green' | 'purple';

interface ColorClasses {
  bg: string;
  light: string;
  border: string;
  badge: string;
}

interface LichNghiLeItem {
  id: number;
  ten: string;
  ngay: string;
  thu: string;
  soNgay: number;
  color: ColorType;
  moTa: string;
  chiTiet: string[];
}

export default function LichNghiLe2026() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const lichNghiLe: LichNghiLeItem[] = [
    {
      id: 1,
      ten: 'Tết Dương lịch',
      ngay: '01/01/2026',
      thu: 'Thứ 5',
      soNgay: 1,
      color: 'blue',
      moTa: 'Nghỉ 1 ngày để đón năm mới Dương lịch',
      chiTiet: ['Ngày 01/01: Nghỉ lễ', 'Ngày 02/01: Đi làm bình thường']
    },
    {
      id: 2,
      ten: 'Tết Nguyên Đán',
      ngay: '17/02/2026',
      thu: 'Thứ 3',
      soNgay: 9,
      color: 'red',
      moTa: 'Nghỉ 9 ngày từ 14/02 - 22/02 (có làm bù)',
      chiTiet: [
        '14/02: Làm bù (Thứ 7)',
        '15/02: 30 Tết',
        '16/02: Giao thừa',
        '17/02: Mùng 1 Tết',
        '18/02: Mùng 2 Tết',
        '19/02: Mùng 3 Tết',
        '20/02: Mùng 4 Tết',
        '21/02: Mùng 5 Tết',
        '22/02: Mùng 6 Tết',
        '23/02: Đi làm lại'
      ]
    },
    {
      id: 3,
      ten: 'Giỗ Tổ Hùng Vương',
      ngay: '06/04/2026',
      thu: 'Thứ 2',
      soNgay: 1,
      color: 'amber',
      moTa: 'Nghỉ 1 ngày (10/3 Âm lịch)',
      chiTiet: ['Ngày 06/04: Nghỉ lễ', 'Ngày 07/04: Đi làm bình thường']
    },
    {
      id: 4,
      ten: 'Ngày Giải phóng miền Nam & Ngày Quốc tế Lao động',
      ngay: '30/04/2026',
      thu: 'Thứ 5',
      soNgay: 5,
      color: 'green',
      moTa: 'Nghỉ liên tục 5 ngày từ 30/04 - 04/05',
      chiTiet: [
        '30/04: Ngày Giải phóng miền Nam',
        '01/05: Ngày Quốc tế Lao động',
        '02/05: Nghỉ bù',
        '03/05: Nghỉ cuối tuần',
        '04/05: Nghỉ bù',
        '05/05: Đi làm lại'
      ]
    },
    {
      id: 5,
      ten: 'Quốc Khánh',
      ngay: '02/09/2026',
      thu: 'Thứ 4',
      soNgay: 4,
      color: 'purple',
      moTa: 'Nghỉ 4 ngày từ 02/09 - 05/09',
      chiTiet: [
        '02/09: Quốc Khánh',
        '03/09: Nghỉ bù',
        '04/09: Nghỉ bù',
        '05/09: Nghỉ cuối tuần',
        '06/09: Nghỉ cuối tuần',
        '07/09: Đi làm lại'
      ]
    }
  ];

  const tongSoNgayNghi = lichNghiLe.reduce((sum, le) => sum + le.soNgay, 0);

  const colorClasses: Record<ColorType, ColorClasses> = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      border: 'border-blue-300',
      badge: 'bg-blue-500'
    },
    red: {
      bg: 'from-red-500 to-red-600',
      light: 'bg-red-50',
      border: 'border-red-300',
      badge: 'bg-red-500'
    },
    amber: {
      bg: 'from-amber-500 to-amber-600',
      light: 'bg-amber-50',
      border: 'border-amber-300',
      badge: 'bg-amber-500'
    },
    green: {
      bg: 'from-green-500 to-green-600',
      light: 'bg-green-50',
      border: 'border-green-300',
      badge: 'bg-green-500'
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      light: 'bg-purple-50',
      border: 'border-purple-300',
      badge: 'bg-purple-500'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Lịch nghỉ lễ năm 2026</h1>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Danh sách đầy đủ các ngày nghỉ lễ, Tết theo quy định của Nhà nước
          </p>
          <div className="flex gap-6 flex-wrap">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Tổng số ngày nghỉ</p>
              <p className="text-3xl font-bold">{tongSoNgayNghi} ngày</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Số dịp nghỉ lễ</p>
              <p className="text-3xl font-bold">{lichNghiLe.length} dịp</p>
            </div>
          </div>
        </div>

        {/* Danh sách ngày lễ */}
        <div className="space-y-6">
          {lichNghiLe.map((le) => (
            <div
              key={le.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${
                colorClasses[le.color].border
              } transition-all hover:shadow-xl`}
            >
              {/* Header card */}
              <div className={`bg-gradient-to-r ${colorClasses[le.color].bg} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{le.ten}</h2>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{le.ngay} ({le.thu})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Nghỉ {le.soNgay} ngày</span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-white/30 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {le.soNgay} ngày
                  </span>
                </div>
              </div>

              {/* Body card */}
              <div className={`p-6 ${colorClasses[le.color].light}`}>
                <p className="text-gray-700 mb-4">{le.moTa}</p>
                
                <button
                  onClick={() => setExpandedId(expandedId === le.id ? null : le.id)}
                  className={`flex items-center gap-2 text-sm font-semibold ${colorClasses[le.color].badge} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all`}
                >
                  {expandedId === le.id ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Thu gọn
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Xem chi tiết
                    </>
                  )}
                </button>

                {expandedId === le.id && (
                  <div className="mt-4 space-y-2 animate-in fade-in duration-300">
                    {le.chiTiet.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-white p-3 rounded-lg"
                      >
                        <span className={`${colorClasses[le.color].badge} text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Lưu ý</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lịch nghỉ có thể thay đổi theo quy định mới nhất của Chính phủ</li>
                <li>• Một số đơn vị có thể có lịch nghỉ khác tùy theo tính chất công việc</li>
                <li>• Ngày làm bù sẽ được thông báo cụ thể bởi đơn vị quản lý</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}