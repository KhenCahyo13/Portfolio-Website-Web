import { BlogDetails } from "@/sanity/blogs/types";

export interface BlogDetailsPageProps {
    slug: string;
}

export interface BlogDetailsViewProps {
    blog: BlogDetails
}