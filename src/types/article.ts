export interface Article {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  metaTitle: string
  metaDescription: string
  imageUrl: string
  publishTime: string | null
  viewCount: number
  commentCount: number
  categoryId: number | null
  siteId: number | null
  dataTypeId: number | null
  articleTypeId: number | null
  reviewStatusId: number
  crUserId: number | null
  crDateTime: string
  updUserId: number | null
  updDateTime: string | null
  revUserId: number | null
  revDateTime: string | null
  categoryName: string | null
}
