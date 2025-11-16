export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Giới thiệu */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Lịch Âm Việt</h2>
          <p className="text-sm opacity-80">
            Xem lịch âm dương, ngày tốt – xấu, tử vi trọn đời, phong thủy, giá vàng và tỷ giá ngoại tệ nhanh và chính xác nhất.
          </p>
        </div>

        {/* Menu nhanh */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Khám phá nhanh</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li><a href="/lich-am" className="hover:text-yellow-300">Lịch âm hôm nay</a></li>
            <li><a href="/ngay-tot" className="hover:text-yellow-300">Xem ngày tốt xấu</a></li>
            <li><a href="/tu-vi" className="hover:text-yellow-300">Tử vi 12 con giáp</a></li>
            <li><a href="/gia-vang" className="hover:text-yellow-300">Giá vàng hôm nay</a></li>
            <li><a href="/ty-gia" className="hover:text-yellow-300">Tỷ giá ngoại tệ</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ & hợp tác</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Email: <a href="mailto:contact@licham.vn" className="hover:text-yellow-300">contact@licham.vn</a></li>
            <li>Hotline: 0981 234 567</li>
            <li><a href="/ve-chung-toi" className="hover:text-yellow-300">Về chúng tôi</a></li>
            <li><a href="/quang-cao" className="hover:text-yellow-300">Đặt quảng cáo</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Theo dõi chúng tôi</h3>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-400" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0..." />
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" className="hover:text-red-400" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1..." />
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" className="hover:text-gray-200" aria-label="TikTok">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10..." />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm opacity-80 border-t border-white/20 pt-4">
        <p>© 2025 Lịch Âm Việt. Tất cả quyền được bảo lưu.</p>
        <p className="mt-1">Nguồn dữ liệu: Tổng hợp từ nhiều nguồn đáng tin cậy trong nước và quốc tế.</p>
      </div>
    </footer>
  );
}
