export const blogListQuery = `
*[_type == "blogs"] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  tags
}`;
