'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, Heart, User, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../types/article';

interface NewsCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('vi-VN', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
              {article.categoryName}
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-200 mb-4 line-clamp-2">{article.summary}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                {/* <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>{article.author}</span>
                </div> */}
                {/* <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{formatDate(article.publishTime)}</span>
                </div> */}
              </div>
              <Link href={`/news/${article.id}`}>
                <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300">
                  <span>Đọc thêm</span>
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {article.categoryName}
            </span>
            {/* <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span> */}
          </div>
          <Link href={`/news/${article.id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            {/* <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>{article.readTime} phút đọc</span>
            </div> */}
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>{formatNumber(article.viewCount)}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
            {article.categoryName}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
            <Heart size={16} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-500">
          <User size={16} />
          {/* <span>{article.author}</span> */}
          <span>•</span>
          <Calendar size={16} />
          {/* <span>{formatDate(article.publishedAt)}</span> */}
        </div>
        
        <Link href={`/news/${article.id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {article.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              {/* <span>{article.readTime} phút</span> */}
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{formatNumber(article.viewCount)}</span>
            </div>
            {/* <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{formatNumber(article.likes)}</span>
            </div> */}
          </div>
          
          <Link href={`/news/${article.id}`}>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <span>Đọc thêm</span>
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}