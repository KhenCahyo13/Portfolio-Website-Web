import { ProjectList } from '@/sanity/projects/types';

export interface ProjectListViewProps {
    projects: ProjectList[];
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    activeStatus: string;
    onStatusChange: (status: string) => void;
    activeTech: string;
    onTechChange: (tech: string) => void;
    availableTechs: string[];
}

export interface ProjectListProps {
    initialQuery?: string;
}
