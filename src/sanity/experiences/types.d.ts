import { SanityImage, SanityRichContent } from '@/types/sanity';

export interface ExperienceList {
    _id: string;
    company: string;
    logo: SanityImage;
    employmentType: string;
    startDate: string;
    endDate: string | null;
    highlights: string[] | null;
    techStack: string[] | null;
    isCurrent: boolean;
    isRemote: boolean;
    location: string;
    role: string;
    summary: SanityRichContent;
}
