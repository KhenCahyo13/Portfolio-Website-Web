export const blogListQuery = `
*[_type == "blogs"
   && (!defined($search) || $search == "" || title match $search)
   && (!defined($tags) || count($tags) == 0 || count((tags[])[@ in $tags]) > 0)
] 
| order(publishedAt desc)[$offset...$offset + $limit - 1] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  author,
  publishedAt,
  readingTime,
  tags
}`;

export const blogDetailsQuery = `
*[_type == "blogs" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  content,
  publishedAt,
  readingTime,
  author,
  tags,
  seo
}`;
