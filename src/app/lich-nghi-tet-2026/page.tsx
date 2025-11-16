'use client';
import React from 'react';
import { Calendar, Clock, Info } from 'lucide-react';

export default function LichNghiTet2026() {
  const tetInfo = {
    namDuong: 2026,
    namAm: 'Bính Ngọ',
    ngayTet: '17/02/2026',
    ngayNghiBu: '14/02/2026',
    tongSoNgay: 9
  };

  const lichNghi = [
    { thu: 'Thứ 7', ngay: '14/02', thang: 'T2', ghiChu: 'Làm bù (29 Tết)' },
    { thu: 'CN', ngay: '15/02', thang: 'T2', ghiChu: '30 Tết', holiday: true },
    { thu: 'Thứ 2', ngay: '16/02', thang: 'T2', ghiChu: 'Giao thừa', holiday: true },
    { thu: 'Thứ 3', ngay: '17/02', thang: 'T2', ghiChu: 'Mùng 1 Tết', holiday: true },
    { thu: 'Thứ 4', ngay: '18/02', thang: 'T2', ghiChu: 'Mùng 2 Tết', holiday: true },
    { thu: 'Thứ 5', ngay: '19/02', thang: 'T2', ghiChu: 'Mùng 3 Tết', holiday: true },
    { thu: 'Thứ 6', ngay: '20/02', thang: 'T2', ghiChu: 'Mùng 4 Tết', holiday: true },
    { thu: 'Thứ 7', ngay: '21/02', thang: 'T2', ghiChu: 'Mùng 5 Tết', holiday: true },
    { thu: 'CN', ngay: '22/02', thang: 'T2', ghiChu: 'Mùng 6 Tết', holiday: true },
    { thu: 'Thứ 2', ngay: '23/02', thang: 'T2', ghiChu: 'Đi làm lại', back: true },
  ];

  const luuY = [
    'Nhân viên sẽ làm bù vào thứ 7 ngày 14/02/2026',
    'Tổng cộng nghỉ 9 ngày liên tục',
    'Đi làm lại từ thứ 2 ngày 23/02/2026',
    'Lịch nghỉ có thể thay đổi theo quy định của Chính phủ'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Lịch nghỉ Tết Nguyên Đán 2026</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Năm Dương lịch</p>
              <p className="text-2xl font-bold">{tetInfo.namDuong}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Năm Âm lịch</p>
              <p className="text-2xl font-bold">{tetInfo.namAm}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Ngày Tết</p>
              <p className="text-2xl font-bold">{tetInfo.ngayTet}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm opacity-90">Tổng số ngày</p>
              <p className="text-2xl font-bold">{tetInfo.tongSoNgay} ngày</p>
            </div>
          </div>
        </div>

        {/* Lịch nghỉ chi tiết */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-red-600" />
            Lịch nghỉ chi tiết
          </h2>
          <div className="space-y-2">
            {lichNghi.map((ngay, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                  ngay.holiday
                    ? 'bg-red-100 border-2 border-red-300'
                    : ngay.back
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-orange-50 border-2 border-orange-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <p className="text-sm text-gray-600">{ngay.thu}</p>
                    <p className="text-xl font-bold text-gray-800">{ngay.ngay}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{ngay.ghiChu}</p>
                    <p className="text-sm text-gray-600">Tháng {ngay.thang} năm 2026</p>
                  </div>
                </div>
                {ngay.holiday && (
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Nghỉ lễ
                  </span>
                )}
                {ngay.back && (
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Đi làm
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lưu ý */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl shadow-xl p-8 border-2 border-orange-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-orange-600" />
            Lưu ý quan trọng
          </h2>
          <ul className="space-y-3">
            {luuY.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Chúc mừng năm mới Bính Ngọ 2026! 🎉🧧
          </p>
        </div>
      </div>
    </div>
  );
}