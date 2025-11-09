'use client';

import { FC, useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@/hooks/use-query';
import { client } from '@/lib/sanity';
import { projectListQuery } from '@/sanity/projects/api';
import { ProjectList } from '@/sanity/projects/types';
import ProjectListView from './view';
import { ProjectListProps } from './types';

const PAGE_SIZE = 6;

const ProjectListContainer: FC<ProjectListProps> = ({ initialQuery = '' }) => {
    const fetcher = useCallback(
        async ({ offset, limit, search, filters }: { offset: number; limit: number; search: string; filters: string[] }) => {
            const statusFilter = filters.find((item) => item.startsWith('status:'))?.split(':')[1] ?? '';
            const techFilter = filters.find((item) => item.startsWith('tech:'))?.split(':')[1] ?? '';

            return client.fetch<ProjectList[]>(projectListQuery, {
                offset,
                limit,
                search: search ? `${search}*` : '',
                status: statusFilter,
                tech: techFilter ? [techFilter] : [],
            });
        },
        [],
    );

    const { data, isLoading, hasMore, search, setSearch, filters, setFilters, loadMore, reset } = useQuery<ProjectList>({
        initialSearch: initialQuery,
        pageSize: PAGE_SIZE,
        fetcher,
    });

    useEffect(() => {
        reset(initialQuery);
    }, [initialQuery, reset]);

    const activeStatus = filters.find((item) => item.startsWith('status:'))?.split(':')[1] ?? '';
    const activeTech = filters.find((item) => item.startsWith('tech:'))?.split(':')[1] ?? '';

    const setStatusFilter = useCallback(
        (status: string) => {
            setFilters((prev) => {
                const withoutStatus = prev.filter((item) => !item.startsWith('status:'));
                return status ? [...withoutStatus, `status:${status}`] : withoutStatus;
            });
        },
        [setFilters],
    );

    const setTechFilter = useCallback(
        (tech: string) => {
            setFilters((prev) => {
                const withoutTech = prev.filter((item) => !item.startsWith('tech:'));
                return tech ? [...withoutTech, `tech:${tech}`] : withoutTech;
            });
        },
        [setFilters],
    );

    const availableTechs = useMemo(() => {
        const techSet = new Set<string>();
        data.forEach((project) => project.techStack?.forEach((tech) => techSet.add(tech)));
        return Array.from(techSet).slice(0, 12);
    }, [data]);

    return (
        <ProjectListView
            projects={data}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            searchTerm={search}
            onSearchChange={setSearch}
            activeStatus={activeStatus}
            onStatusChange={setStatusFilter}
            activeTech={activeTech}
            onTechChange={setTechFilter}
            availableTechs={availableTechs}
        />
    );
};

export default ProjectListContainer;
