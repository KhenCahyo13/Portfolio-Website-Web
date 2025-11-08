import { SanityImage, SanitySlug } from "@/types/sanity";

export interface BlogList {
    _id: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    readingTime: number;
    slug: SanitySlug;
    tags: string[];
    coverImage: SanityImage;
};