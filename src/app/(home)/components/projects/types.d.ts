import { ProjectList } from "@/sanity/projects/types";

export interface ProjectsViewProps {
    projects: ProjectList[];
    isLoading: boolean;
}