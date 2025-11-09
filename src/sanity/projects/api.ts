export const projectListQuery = `
*[_type == "projects"
   && (!defined($search) || $search == "" || title match $search)
   && (!defined($tech) || count($tech) == 0 || count((techStack[])[@ in $tech]) > 0)
   && (!defined($status) || $status == "" || status == $status)
] | order(coalesce(orderRank, 999) asc, startDate desc)[$offset...$offset + $limit - 1] {
  _id,
  title,
  slug,
  summary,
  heroImage,
  status,
  techStack,
  role,
  teamSize,
  client,
  startDate,
  endDate,
  orderRank
}`;

export const projectDetailsQuery = `
*[_type == "projects" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  summary,
  heroImage,
  gallery,
  content,
  status,
  techStack,
  responsibilities,
  role,
  teamSize,
  client,
  startDate,
  endDate,
  responsibilities,
  links,
  metrics
}`;
