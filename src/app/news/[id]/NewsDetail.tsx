// 'use client'

// import type { Article } from '@/types/article'

// export default function NewsDetail({ article }: { article: Article }) {
//   return (
//     <>
//       <head>
//         <title>{article.title}</title>
//         <meta name="description" content={article.summary} />
//       </head>

//       <div className="min-h-screen bg-gray-50">
//         <main className="max-w-4xl mx-auto px-4 py-8">
//           <article className="bg-white rounded-lg shadow-md p-6">
//             {article.categoryName && (
//               <div className="mb-4">
//                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                   {article.categoryName}
//                 </span>
//               </div>
//             )}
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               {article.title}
//             </h1>
//             <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6 pb-4 border-b">
//               <span>ID: {article.id}</span>
//               {article.publishTime && (
//                 <span>
//                   {new Date(article.publishTime).toLocaleDateString('vi-VN')}
//                 </span>
//               )}
//               <span>👁️ {article.viewCount}</span>
//               <span>💬 {article.commentCount}</span>
//             </div>
//             {article.imageUrl && (
//               <div className="mb-6">
//                 <img
//                   src={article.imageUrl}
//                   alt={article.title}
//                   className="w-full h-64 object-cover rounded-lg"
//                 />
//               </div>
//             )}
//             <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//               <p className="text-gray-700 font-medium">{article.summary}</p>
//             </div>
//             <div
//               className="prose max-w-none"
//               dangerouslySetInnerHTML={{ __html: article.content }}
//             />
//           </article>
//         </main>
//       </div>
//     </>
//   )
// }
