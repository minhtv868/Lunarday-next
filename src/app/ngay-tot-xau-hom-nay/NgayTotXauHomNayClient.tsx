'use client';

import { Calendar } from 'lucide-react';

export default function NgayTotXauHomNayClient() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-md">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                Ngày Tốt Xấu Hôm Nay
              </h1>
              <p className="text-gray-500">Xem chi tiết ngày tốt, ngày xấu hôm nay.</p>
            </div>
          </div>

          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-700">Nội dung đang được xây dựng</h2>
            <p className="text-gray-500 mt-2">Trang này sẽ sớm được cập nhật với đầy đủ thông tin chi tiết về ngày tốt xấu hôm nay.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
