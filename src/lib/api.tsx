import axios, { AxiosResponse, AxiosError } from "axios";
import type { Article } from "../types/article";
import type { Category } from "../types/category";
import type { PaginatedResult } from "@/types/paginated";
import { Match } from "@/types/match";
import https from "https";
import { Seo } from "@/types/seo";

// Configuration
const CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || "1234",
  API_BASE: process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7008",
  SITE_ID: Number(process.env.NEXT_PUBLIC_SITE_ID) || 1,
  DEFAULT_PAGE_SIZE: 20,
  DEFAULT_CATEGORY_ID: 1,
  DEFAULT_REVIEW_STATUS_ID: 1,
  REQUEST_TIMEOUT: 10000,
} as const;

// API Client setup
const api = axios.create({
  baseURL: CONFIG.API_BASE,
  timeout: CONFIG.REQUEST_TIMEOUT,
  headers: {
    "x-api-key": CONFIG.API_KEY,
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
      const response = await api.get<Article[]>("/api/Article/GetAllBySite");
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
      pageSize = CONFIG.DEFAULT_PAGE_SIZE,
      categoryId = CONFIG.DEFAULT_CATEGORY_ID,
      reviewStatusId = CONFIG.DEFAULT_REVIEW_STATUS_ID,
      siteId = CONFIG.SITE_ID
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
      const response = await api.get<Article>(`/api/Article/GetById?id=${id}`);
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
    const { siteId = CONFIG.SITE_ID } = params;

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