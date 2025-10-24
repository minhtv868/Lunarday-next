// // src/app/news/[id]/page.tsx
// import { articleApi } from '@/lib/api'
// import type { Article } from '@/types/article'
// import NewsDetail from './NewsDetail' // Client component riêng

// type PageProps = {
//   params: { id: string }
// }

// export default async function Page({ params }: PageProps) {
//   const article: Article = await articleApi.getById(params.id)

//   r>eturn <NewsDetail article={article} />
// }
// src/app/news/[id]/page.tsx



export default async function Page() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>News Detail Page</h1>
      <p>Nội dung test HTML render trực tiếp từ server component.</p>
    </div>
  )
}
