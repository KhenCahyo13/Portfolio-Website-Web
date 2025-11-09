import { ExperienceList } from '@/sanity/experiences/types';

export interface ExperiencesViewProps {
    experiences: ExperienceList[];
    isLoading: boolean;
}
