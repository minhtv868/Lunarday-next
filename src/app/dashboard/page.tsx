// app/news/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dữ liệu mẫu
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: 'Công nghệ AI đang thay đổi ngành công nghiệp như thế nào',
      excerpt: 'Trí tuệ nhân tạo đang tạo ra cuộc cách mạng trong nhiều lĩnh vực từ y tế đến giáo dục...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Công nghệ',
      author: 'Nguyễn Văn A',
      date: '2024-10-25',
      image: '/api/placeholder/800/400',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Xu hướng phát triển web năm 2024',
      excerpt: 'Các framework và công nghệ mới đang định hình tương lai của phát triển web...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Công nghệ',
      author: 'Trần Thị B',
      date: '2024-10-24',
      image: '/api/placeholder/800/400',
      readTime: '7 phút đọc'
    },
    {
      id: 3,
      title: 'Khởi nghiệp trong thời đại số',
      excerpt: 'Những bài học quý giá từ các startup thành công trong lĩnh vực công nghệ...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Kinh doanh',
      author: 'Lê Văn C',
      date: '2024-10-23',
      image: '/api/placeholder/800/400',
      readTime: '6 phút đọc'
    },
    {
      id: 4,
      title: 'Bảo mật thông tin trong kỷ nguyên số',
      excerpt: 'Các biện pháp bảo vệ dữ liệu cá nhân và doanh nghiệp trong môi trường mạng...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Bảo mật',
      author: 'Phạm Thị D',
      date: '2024-10-22',
      image: '/api/placeholder/800/400',
      readTime: '8 phút đọc'
    },
    {
      id: 5,
      title: 'Marketing số hiện đại',
      excerpt: 'Chiến lược marketing hiệu quả trong thời đại mạng xã hội và công nghệ...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Marketing',
      author: 'Hoàng Văn E',
      date: '2024-10-21',
      image: '/api/placeholder/800/400',
      readTime: '5 phút đọc'
    },
    {
      id: 6,
      title: 'Tương lai của thương mại điện tử',
      excerpt: 'E-commerce đang phát triển với tốc độ chóng mặt, mở ra nhiều cơ hội mới...',
      content: 'Nội dung đầy đủ bài viết...',
      category: 'Kinh doanh',
      author: 'Đỗ Thị F',
      date: '2024-10-20',
      image: '/api/placeholder/800/400',
      readTime: '6 phút đọc'
    }
  ];

  const categories = ['all', ...Array.from(new Set(newsArticles.map(article => article.category)))];

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tiêu đề trang */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tin tức & Bài viết
          </h1>
          <p className="text-gray-600">
            Cập nhật những tin tức mới nhất về công nghệ, kinh doanh và nhiều hơn nữa
          </p>
        </div>

        {/* Bộ lọc danh mục */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>

        {/* Bài viết nổi bật */}
        {filteredArticles.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={filteredArticles[0].image}
                    alt={filteredArticles[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4 w-fit">
                    {filteredArticles[0].category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {filteredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span>{filteredArticles[0].author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(filteredArticles[0].date)}</span>
                    <span className="mx-2">•</span>
                    <span>{filteredArticles[0].readTime}</span>
                  </div>
                  <Link 
                    href={`/news/${filteredArticles[0].id}`}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-fit"
                  >
                    Đọc thêm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Danh sách bài viết */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(article.date)}</span>
                </div>
                <Link 
                  href={`/news/${article.id}`}
                  className="text-blue-600 font-medium hover:text-blue-700 flex items-center"
                >
                  Đọc thêm
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Thông báo khi không có bài viết */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không có bài viết nào trong danh mục này
            </p>
          </div>
        )}
      </div>
    </div>
  );
}