"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, Heart, User, Calendar, ArrowRight } from "lucide-react";
import { Article } from "../types/article";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export default function NewsCard({
  article,
  variant = "default",
}: NewsCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 active:scale-[0.98] sm:hover:-translate-y-2">
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="inline-flex items-center px-2.5 py-1 sm:px-3 rounded-full text-xs font-medium bg-blue-500 text-white shadow-lg">
              {article.categoryName}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
              {article.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm">
                {/* User and date info */}
              </div>
              <Link href={`/news/${article.id}`} className="touch-manipulation">
                <button className="flex items-center space-x-1.5 sm:space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 text-sm">
                  <span>Đọc thêm</span>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-xl transition-all duration-300 active:scale-[0.98]">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1.5 sm:mb-2">
            <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {article.categoryName}
            </span>
          </div>
          <Link href={`/news/${article.id}`} className="touch-manipulation">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-3 sm:space-x-4 mt-2 text-xs text-gray-500">
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
    <article className="group bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden active:scale-[0.98] sm:hover:-translate-y-1">
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 rounded-full text-xs font-medium bg-blue-500 text-white shadow-lg">
            {article.categoryName}
          </span>
        </div>
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 touch-manipulation">
            <Heart size={14} className="text-white sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-2 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-500">
          <User size={14} className="sm:w-4 sm:h-4" />
          <span>•</span>
          <Calendar size={14} className="sm:w-4 sm:h-4" />
        </div>

        <Link href={`/news/${article.id}`} className="touch-manipulation">
          <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
            {article.title}
          </h2>
        </Link>

        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {article.summary}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={14} className="sm:w-4 sm:h-4" />
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} className="sm:w-4 sm:h-4" />
              <span>{formatNumber(article.viewCount)}</span>
            </div>
          </div>

          <Link href={`/news/${article.id}`} className="touch-manipulation">
            <button className="flex items-center space-x-1.5 sm:space-x-2 text-blue-600 hover:text-blue-800 active:text-blue-900 font-medium transition-colors text-sm">
              <span>Đọc thêm</span>
              <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}
