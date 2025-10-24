"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Grid, List, Clock, Eye } from "lucide-react";
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
  const loadArticles = async (page: number = 1, reset: boolean = false) => {
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
  };

  // Initial load
  useEffect(() => {
    if (initialArticles.length === 0) {
      loadArticles(1, true);
    }
  }, []);

  // Handle load more
  const handleLoadMore = () => {
    if (hasMorePages && !loading) {
      loadArticles(currentPage + 1, false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const featuredArticles = articles.slice(0, 4); // Top 3 for featured section
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
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Tin Tức Hôm Nay
                </h1>
                <p className="text-gray-600 flex items-center">
                  <Clock size={16} className="mr-1" />
                  {/* Cập nhật lúc: {new Date().toLocaleString('vi-VN')} */}
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading && articles.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Featured News Section */}
              {featuredArticles.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="mr-2 text-red-500" size={24} />
                    Tin Nổi Bật
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    <div className="space-y-4">
                      {featuredArticles.slice(0).map((article) => (
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

              {/* Latest News Section */}
              {regularArticles.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Tin Tức Mới Nhất
                  </h2>
                  
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
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

              {/* Empty State */}
              {articles.length === 0 && !loading && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">📰</div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                    Chưa có tin tức
                  </h3>
                  <p className="text-gray-500">
                    Hệ thống đang cập nhật nội dung mới
                  </p>
                </div>
              )}
            </>
          )}

          {/* Load More Button */}
          {hasMorePages && articles.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
              >
                {loading ? "Đang tải..." : "Xem thêm tin tức"}
              </button>
            </div>
          )}
        </div>

       
      </div>
    </>
  );
}