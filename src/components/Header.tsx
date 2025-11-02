'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, ChevronDown, Calendar, Clock, Star, Award, TrendingUp, Home, 
  BarChart3, Coins
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

type MenuKey = 'lich_am' | 'ngay_tot' | 'tu_vi' | 'gia_vang' | 'ty_gia';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<MenuKey | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (menu: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
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
        { icon: Calendar, label: 'Lịch ngày', href: '/' },
        { icon: Calendar, label: 'Lịch âm', href: '/lich-am-duong-hom-nay' },
      ]
    },
    ngay_tot: {
      title: 'Ngày tốt – xấu',
      items: [
        { icon: Calendar, label: 'Ngày tốt hôm nay', href: '/ngay-tot-xau-hom-nay' },
        { icon: Award, label: 'Cưới hỏi', href: '/ngay-tot-cuoi-hoi' },
        { icon: Star, label: 'Khai trương', href: '/ngay-tot-khai-truong' },
        { icon: Clock, label: 'Động thổ', href: '/ngay-tot-dong-tho' }
      ]
    },
    tu_vi: {
      title: 'Tử vi',
      items: [
        { icon: Star, label: '12 con giáp hôm nay', href: '/tu-vi-12-con-giap' },
        { icon: Calendar, label: 'Theo tuổi', href: '/tu-vi-theo-tuoi' },
        { icon: BarChart3, label: 'Cung mệnh – Ngũ hành', href: '/cung-menh-ngu-hanh' }
      ]
    },
    gia_vang: {
      title: 'Giá vàng',
      items: [
        { icon: Coins, label: 'Giá vàng hôm nay', href: '/gia-vang-hom-nay' },
        { icon: BarChart3, label: 'Biểu đồ giá vàng', href: '/bieu-do-gia-vang' },
        { icon: Award, label: 'SJC – PNJ – DOJI', href: '/gia-vang-sjc-pnj-doji' }
      ]
    },
    ty_gia: {
      title: 'Tỷ giá',
      items: [
        { icon: TrendingUp, label: 'Tỷ giá hôm nay', href: '/ty-gia-hom-nay' },
        { icon: BarChart3, label: 'USD – EUR – JPY', href: '/ty-gia-ngoai-te' },
        { icon: Award, label: 'Ngân hàng VN', href: '/ty-gia-ngan-hang' }
      ]
    }
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-3xl">📅</div>
          <h1 className="text-xl font-bold gradient-text">Lịch Việt 2026</h1>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
              pathname === '/' ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <Home size={18} /> <span>Trang chủ</span>
          </Link>

          {Object.entries(menuItems).map(([key, menu]) => (
            <div 
              key={key} 
              className="relative"
              onMouseEnter={() => handleMouseEnter(key as MenuKey)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-600">
                <span>{menu.title}</span>
                <ChevronDown size={16} className="ml-1" />
              </button>

              {activeDropdown === key && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  {menu.items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 ${
                        isMenuItemActive(item.href) ? 'bg-blue-100 text-blue-700' : ''
                      }`}
                    >
                      <item.icon size={18} className="text-gray-500" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile */}
        <button
          className="lg:hidden p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-1 pt-4">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key}>
                <div className="px-4 py-2 text-sm font-semibold uppercase text-gray-600">{menu.title}</div>
                {menu.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-6 py-2.5 rounded-lg ${
                      isMenuItemActive(item.href) ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <item.icon size={18} className="text-gray-500" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
