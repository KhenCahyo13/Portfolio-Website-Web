export const blogListQuery = `
*[_type == "blogs"] | order(publishedAt desc)[0...3] {
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
