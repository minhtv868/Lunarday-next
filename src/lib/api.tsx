import axios, { AxiosResponse, AxiosError } from "axios";
import type { Article } from "../types/article";
import type { Category } from "../types/category";
import type { PaginatedResult } from "@/types/paginated";
import { Match } from "@/types/match";
import https from "https";
import { Seo } from "@/types/seo";
import { XemNgayTotXauModel } from "@/types/xemngay";
import { CONFIG } from "@/constants/config";
// API Client setup
const api = axios.create({
  baseURL: CONFIG.API.API_BASE,
  timeout: CONFIG.API.REQUEST_TIMEOUT,
  headers: {
    "x-api-key": CONFIG.API.API_KEY,
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = error?.response?.data || error?.message || "Unknown error";
    const statusCode = error?.response?.status;
    
    console.error("API Error:", errorMessage);

    if (statusCode === 401) {
      console.error("Unauthorized - Check API key");
    } else if (statusCode === 404) {
      console.error("API endpoint not found");
    } else if (statusCode && statusCode >= 500) {
      console.error("Server error - Please try again later");
    }

    return Promise.reject(error);
  }
);

// Type definitions
interface GetArticlesPageParams {
  keywords?: string;
  page?: number;
  pageSize?: number;
  categoryId?: number;
  reviewStatusId?: number;
  siteId?: number;
}

interface GetCategoriesParams {
  siteId?: number;
}

// API Functions
export const articleApi = {
  async getAll(): Promise<Article[]> {
    try {
      const response = await api.get<Article[]>("/Article/GetAllBySite");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      throw new Error("Unable to fetch articles");
    }
  },

  async getPage(params: GetArticlesPageParams = {}): Promise<PaginatedResult<Article>> {
    const {
      keywords = "",
      page = 1,
      pageSize = CONFIG.API.DEFAULT_PAGE_SIZE,
      categoryId = CONFIG.API.DEFAULT_CATEGORY_ID,
      reviewStatusId = CONFIG.API.DEFAULT_REVIEW_STATUS_ID,
      siteId = CONFIG.API.SITE_ID
    } = params;

    try {
      const response = await api.get<PaginatedResult<Article>>(
        "/api/Article/GetPage",
        {
          params: { keywords, page, pageSize, categoryId, reviewStatusId, siteId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch article page:", error);
      throw new Error("Unable to fetch article page");
    }
  },

  async getById(id: string | number): Promise<Article> {
    try {
      const response = await api.get<Article>(`/Article/GetById?id=${id}`);
      if (!response.data) {
        throw new Error("Article not found");
      }
      return response.data;
    } catch (error) {
      console.error("Failed to fetch article:", error);
      throw new Error("Unable to fetch article");
    }
  },
};

export const categoryApi = {
  async getAll(params: GetCategoriesParams = {}): Promise<Category[]> {
    const { siteId = CONFIG.API.SITE_ID } = params;

    try {
      const response = await api.get<Category[]>(
        "/api/Categories/GetAllBySite",
        {
          params: { siteId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error("Unable to fetch categories");
    }
  },
};

export const matchApi = {
  async getSchedule(params?: { leagueId?: number;leagueUrl?: string; estimateStartTime?: string }): Promise<Match[]> {
    try {
      const response = await api.get<Match[]>("/api/Schedule/GetAllSchedule", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
      throw new Error("Unable to fetch schedule");
    }
  },
};

// FIX: Correct API endpoint for SEO
export const getSeoApi = {
  async getSeoByUrl(params: { seoUrl: string }): Promise<Seo> {
    try {
      // FIX: Change endpoint from GetAllSchedule to correct SEO endpoint
      const response = await api.get<Seo>("/api/Seo/GetSeoByUrl", { 
        params 
      });
      
      if (!response.data) {
        throw new Error("SEO data not found");
      }
      
      return response.data;
    } catch (error) {
      console.error("Failed to fetch SEO:", error);
      throw new Error("Unable to fetch seo");
    }
  }
};

export const xemNgayApi = {
  async getLichNgay(params: { date: string; NumbDay: number; type: number }): 
    Promise<XemNgayTotXauModel> 
  {
    try {
      const response = await api.get(`${CONFIG.API.ENDPOINTS.LICHNGAY}`, { params });

      const result = response.data;

      if (!result?.succeeded) {
        throw new Error(result?.messages?.[0] ?? "Call API Lịch Ngày thất bại");
      }

      // ✅ chuyển JSON string -> object
      const data: XemNgayTotXauModel = result.data
        ? result.data
        : null;

      if (!data) {
        throw new Error("Không có dữ liệu lịch ngày");
      }

      return data;
    } catch (error) {
      console.error("[Lịch Ngày API Error]:", error);
      throw new Error("Không thể tải thông tin lịch ngày");
    }
  },
   async getXemNgayHomNay() {
  const today = new Date();
  
  // Lấy ngày, tháng, năm
  const dd = String(today.getDate()).padStart(2, '0');   // ngày 2 chữ số
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // tháng 2 chữ số (0-indexed)
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}-${mm}-${yyyy}`; // dd-mm-yyyy

  return await this.getLichNgay({
    date: formattedDate,
    NumbDay: 0,
    type: 0
  });
}

};


// Utility functions
export const apiUtils = {
  async searchArticles(keywords: string, page = 1): Promise<PaginatedResult<Article>> {
    return articleApi.getPage({ keywords, page });
  },

  async getArticlesByCategory(categoryId: number, page = 1): Promise<PaginatedResult<Article>> {
    return articleApi.getPage({ categoryId, page });
  },

  async getArticlesByReviewStatus(reviewStatusId: number, page = 1): Promise<PaginatedResult<Article>> {
    return articleApi.getPage({ reviewStatusId, page });
  },
};

export { api, CONFIG };