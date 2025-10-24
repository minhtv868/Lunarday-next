export interface Category {
  categoryId: number;
  categoryName: string;
  categoryDesc: string;
  shortName: string;
  categoryUrl: string;
  dataTypeId?: number;
  siteId?: number;
  metaTitle: string;
  metaDesc: string;
  metaKeyword: string;
  canonicalTag: string;
  h1Tag: string;
  seoFooter: string;
  parentCategoryId?: number;
  categoryLevel?: number;
  imagePath: string;
  displayOrder?: number;
  treeOrder?: number;
  reviewStatusId: number;
  crUserId?: number;
  crDateTime: string; // hoặc Date nếu bạn xử lý dạng Date
}
