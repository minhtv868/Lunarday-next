'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, ChevronDown, Calendar, Clock, Star, Award, TrendingUp, Home, 
  BarChart3, Coins, Rss, FileText, Mail, Shield, Info, Lightbulb, Book,
  Newspaper, Banknote, Fuel, Phone, Car, Heart, Users, Scissors, XCircle
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

type MenuKey = 'lich_am' | 'ngay_tot' | 'tu_vi'| 'tai_chinh' | 'tin_tuc' | 'gioi_thieu';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<MenuKey | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (menu: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const toggleMobileSubmenu = (key: MenuKey) => {
    setExpandedMobile(expandedMobile === key ? null : key);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isMenuItemActive = (href: string) => pathname === href;

  const menuItems: Record<MenuKey, MenuGroup> = {
    lich_am: {
      title: 'Lịch âm',
      items: [
        { icon: Calendar, label: 'Lịch âm hôm nay', href: '/lich-am-hom-nay' },
        { icon: Calendar, label: 'Lịch âm theo tháng', href: '/lich-am-thang-[thang]-[nam]' },
        { icon: Calendar, label: 'Lịch vạn niên', href: '/lich-van-nien' },
        { icon: Calendar, label: 'Đổi ngày Dương ↔ Âm', href: '/doi-ngay-duong-lich-am-lich' },
        { icon: Clock, label: 'Giờ hoàng đạo hôm nay', href: '/gio-hoang-dao-hom-nay' },
        { icon: Calendar, label: 'Lịch nghỉ Tết 2026', href: '/lich-nghi-tet-2026' },
        { icon: Calendar, label: 'Lịch nghỉ lễ 2026', href: '/lich-nghi-le-2026' },
      ]
    },

    ngay_tot: {
      title: 'Ngày tốt – xấu',
      items: [
        { icon: Calendar, label: 'Ngày tốt hôm nay', href: '/ngay-tot-hom-nay' },
        { icon: Award, label: 'Xây nhà', href: '/ngay-tot-xay-nha' },
        { icon: Heart, label: 'Cưới hỏi', href: '/ngay-tot-cuoi-hoi' },
        { icon: Star, label: 'Khai trương', href: '/ngay-tot-khai-truong' },
        { icon: Scissors, label: 'Cắt tóc', href: '/ngay-tot-cat-toc' },
        { icon: XCircle, label: 'Ngày xấu nên tránh', href: '/ngay-xau-tranh' },
      ]
    },

    tu_vi: {
      title: 'Tử vi & Phong thủy',
      items: [
        { icon: Star, label: 'Tử vi hôm nay', href: '/tu-vi-hom-nay' },
        { icon: Star, label: 'Tử vi 12 con giáp', href: '/tu-vi-12-con-giap' },
        { icon: Calendar, label: 'Theo ngày sinh', href: '/tu-vi-theo-ngay-sinh' },
        { icon: BarChart3, label: 'Ngũ hành – Mệnh hợp', href: '/ngu-hanh-va-menh' },
        { icon: Heart, label: 'Bói tình yêu', href: '/boi-tinh-yeu-theo-ngay-sinh' },
        { icon: Users, label: 'Bói hợp tuổi kết hôn', href: '/boi-hon-nhan-hop-tuoi' },
        { icon: Home, label: 'Xem hướng nhà hợp tuổi', href: '/xem-huong-nha-hop-tuoi' },
        { icon: Car, label: 'Bói biển số xe', href: '/boi-bien-so-xe' },
        { icon: Phone, label: 'Bói số điện thoại', href: '/boi-so-dien-thoai' },
      ]
    },

    tai_chinh: {
      title: 'Tài chính',
      items: [
        { icon: Coins, label: 'Giá vàng hôm nay', href: '/gia-vang-hom-nay' },
        { icon: Coins, label: 'Giá vàng SJC', href: '/gia-vang-sjc' },
        { icon: Coins, label: 'Giá vàng 9999', href: '/gia-vang-9999' },
        { icon: Coins, label: 'Giá vàng thế giới', href: '/gia-vang-the-gioi' },
        { icon: BarChart3, label: 'Lịch sử giá vàng', href: '/gia-vang-qua-cac-nam' },
        { icon: TrendingUp, label: 'Tỷ giá hôm nay', href: '/ty-gia-hom-nay' },
        { icon: BarChart3, label: 'USD – EUR – JPY', href: '/ty-gia-ngoai-te' },
        { icon: Banknote, label: 'Biểu đồ tỷ giá', href: '/bieu-do-ty-gia' },
        { icon: Fuel, label: 'Giá xăng dầu hôm nay', href: '/gia-xang-dau-hom-nay' },
      ]
    },

    tin_tuc: {
      title: 'Tin tức',
      items: [
        { icon: Newspaper, label: 'Tin tài chính', href: '/tin-tuc' },
        { icon: Coins, label: 'Tin giá vàng', href: '/tin-tuc/gia-vang' },
        { icon: Star, label: 'Tử vi – Phong thủy', href: '/tin-tuc-tu-vi' },
        { icon: Book, label: 'Cẩm nang phong thủy', href: '/cam-nang-phong-thuy' },
        { icon: Lightbulb, label: 'Mẹo hay cuộc sống', href: '/meo-hay' },
      ]
    },

    gioi_thieu: {
      title: 'Giới thiệu',
      items: [
        { icon: Info, label: 'Giới thiệu website', href: '/gioi-thieu' },
        { icon: Mail, label: 'Liên hệ – Quảng cáo', href: '/lien-he' },
        { icon: Shield, label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
        { icon: FileText, label: 'Điều khoản sử dụng', href: '/dieu-khoan-su-dung' },
        { icon: Rss, label: 'RSS & Sitemap', href: '/rss.xml' },
      ]
    },
  };

  return (
    <>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .dropdown-enter {
          animation: slideDown 0.2s ease-out;
        }

        .mobile-menu-enter {
          animation: fadeIn 0.3s ease-out;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <nav className="sticky top-0 z-50 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-3xl transform transition-transform group-hover:scale-110">📅</div>
            <h1 className="text-xl font-bold gradient-text">Lịch Việt</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 ${
                pathname === '/' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Home size={18} />
              <span></span>
            </Link>

            {Object.entries(menuItems).map(([key, menu]) => (
              <div 
                key={key} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(key as MenuKey)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                  <span>{menu.title}</span>
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform duration-200 ${
                      activeDropdown === key ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {activeDropdown === key && (
                  <div className="dropdown-enter absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-96 overflow-y-auto">
                    {menu.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 transition-colors duration-150 ${
                          isMenuItemActive(item.href) 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        <item.icon size={18} className={isMenuItemActive(item.href) ? 'text-blue-600' : 'text-gray-500'} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mobile-menu-enter mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4 max-h-[calc(80vh-4rem)] overflow-y-auto">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200 ${
                  pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <Home size={20} />
                <span className="font-medium">Trang chủ</span>
              </Link>

              {/* Menu Items with Accordion */}
              {Object.entries(menuItems).map(([key, menu]) => (
                <div key={key} className="mx-2">
                  <button
                    onClick={() => toggleMobileSubmenu(key as MenuKey)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group"
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {menu.title}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-gray-400 transition-all duration-300 ${
                        expandedMobile === key ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {/* Submenu with smooth animation */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMobile === key ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-2 space-y-1 border-l-2 border-gray-200 pl-2">
                      {menu.items.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-150 ${
                            isMenuItemActive(item.href) 
                              ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-600 -ml-0.5 shadow-sm' 
                              : 'hover:bg-gray-50 active:bg-gray-100 text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          <item.icon 
                            size={18} 
                            className={`${
                              isMenuItemActive(item.href) ? 'text-blue-600' : 'text-gray-400'
                            } transition-colors`} 
                          />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}