import { SanityImage, SanityRichContent, SanitySeo, SanitySlug } from "@/types/sanity";

export interface BlogList {
    _id: string;
    title: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    readingTime: number;
    slug: SanitySlug;
    tags: string[];
    coverImage: SanityImage;
};

export interface BlogDetails extends BlogList {
    author: string;
    content: SanityRichContent;
    seo: SanitySeo;
}
