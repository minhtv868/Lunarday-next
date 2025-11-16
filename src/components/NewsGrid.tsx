"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingUp, Grid, List, Clock } from "lucide-react";
import NewsCard from "./NewsCard";
import { Article } from "../types/article";
import { articleApi } from "../lib/api";
import Head from "next/head";

interface NewsGridProps {
  initialArticles?: Article[];
}

export default function NewsGrid({ initialArticles = [] }: NewsGridProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const pageSize = 12;

  // Load articles from API
  const loadArticles = useCallback(async (page: number = 1, reset: boolean = false) => {
    setLoading(true);
    try {
      const response = await articleApi.getPage({
        page: page,
        pageSize: pageSize,
      });

      if (reset || page === 1) {
        setArticles(response.data);
      } else {
        setArticles((prev) => [...prev, ...response.data]);
      }

      setHasMorePages(response.currentPage < response.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading articles:", error);
      // Fallback to initial articles or empty array on error
      if (reset || page === 1) {
        setArticles(initialArticles);
      }
    } finally {
      setLoading(false);
    }
  }, [initialArticles, pageSize]);

  // Initial load
  useEffect(() => {
    if (initialArticles.length === 0) {
      loadArticles(1, true);
    }
  }, [initialArticles.length, loadArticles]);

  // Handle load more
  const handleLoadMore = () => {
    if (hasMorePages && !loading) {
      loadArticles(currentPage + 1, false);
    }
  };

  const featuredArticles = articles.slice(0, 4);
  const regularArticles = articles.slice(4);

  return (
    <>
      <Head>
        <title>Tin tức hôm nay - Cập nhật 24/7</title>
        <meta
          name="description"
          content="Tin tức nóng hổi, cập nhật liên tục 24/7 từ các lĩnh vực chính trị, kinh tế, xã hội, thể thao, giải trí."
        />
        <meta property="og:title" content="Tin tức hôm nay" />
        <meta
          property="og:description"
          content="Nơi cập nhật tin tức nhanh chóng và chính xác nhất"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header - Mobile Optimized */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
                  Tin Tức Hôm Nay
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <Clock size={14} className="mr-1 flex-shrink-0 sm:w-4 sm:h-4" />
                  <span className="truncate">Cập nhật liên tục</span>
                </p>
              </div>
              
              {/* View Toggle - Mobile Friendly */}
              <div className="flex bg-gray-100 rounded-lg p-0.5 sm:p-1 flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 touch-manipulation ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 active:bg-gray-200"
                  }`}
                  aria-label="Chế độ lưới"
                >
                  <Grid size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 sm:p-2 rounded-md transition-all duration-200 touch-manipulation ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600 active:bg-gray-200"
                  }`}
                  aria-label="Chế độ danh sách"
                >
                  <List size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          {loading && articles.length === 0 ? (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                <p className="text-sm text-gray-500">Đang tải tin tức...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Featured News Section - Mobile Optimized */}
              {featuredArticles.length > 0 && (
                <section className="mb-8 sm:mb-12">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                    <TrendingUp className="mr-2 text-red-500 flex-shrink-0" size={20} />
                    <span>Tin Nổi Bật</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main featured article */}
                    {featuredArticles[0] && (
                      <div className="lg:col-span-2">
                        <NewsCard 
                          article={featuredArticles[0]} 
                          variant="featured" 
                        />
                      </div>
                    )}
                    
                    {/* Side featured articles */}
                    <div className="space-y-3 sm:space-y-4">
                      {featuredArticles.slice(1).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          variant="compact"
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Latest News Section - Mobile Optimized */}
              {regularArticles.length > 0 && (
                <section>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Tin Tức Mới Nhất
                  </h2>
                  
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                        : "space-y-3 sm:space-y-4"
                    }
                  >
                    {regularArticles.map((article) => (
                      <NewsCard
                        key={article.id}
                        article={article}
                        variant={viewMode === "list" ? "compact" : "default"}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Empty State - Mobile Optimized */}
              {articles.length === 0 && !loading && (
                <div className="text-center py-16 sm:py-20 px-4">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📰</div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
                    Chưa có tin tức
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500">
                    Hệ thống đang cập nhật nội dung mới
                  </p>
                </div>
              )}
            </>
          )}

          {/* Load More Button - Mobile Optimized */}
          {hasMorePages && articles.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] touch-manipulation text-sm sm:text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Đang tải...</span>
                  </span>
                ) : (
                  "Xem thêm tin tức"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}