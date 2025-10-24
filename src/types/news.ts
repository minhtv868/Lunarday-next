export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  likes: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}