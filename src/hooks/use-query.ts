'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface QueryFetcherParams {
    offset: number;
    limit: number;
    search: string;
    filters: string[];
}

interface UseQueryOptions<T> {
    initialSearch?: string;
    pageSize?: number;
    fetcher: (params: QueryFetcherParams) => Promise<T[]>;
}

export const useQuery = <T,>({ initialSearch = '', pageSize = 6, fetcher }: UseQueryOptions<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(initialSearch);
    const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
    const [filters, setFilters] = useState<string[]>([]);

    const initialSearchRef = useRef(initialSearch);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 350);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        setPage(0);
        setData([]);
        setHasMore(true);
    }, [debouncedSearch, filters]);

    useEffect(() => {
        let ignore = false;

        const run = async () => {
            try {
                setIsLoading(true);
                const offset = page * pageSize;
                const params: QueryFetcherParams = {
                    offset,
                    limit: pageSize,
                    search: debouncedSearch,
                    filters,
                };
                const result = await fetcher(params);
                if (ignore) return;
                setData((prev) => (offset === 0 ? result ?? [] : [...prev, ...(result ?? [])]));
                setHasMore((result ?? []).length === pageSize);
            } catch (error) {
                if (!ignore) {
                    console.error('[useQuery] fetch error', error);
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        run();

        return () => {
            ignore = true;
        };
    }, [page, debouncedSearch, filters, pageSize, fetcher]);

    const loadMore = useCallback(() => {
        if (hasMore && !isLoading) {
            setPage((prev) => prev + 1);
        }
    }, [hasMore, isLoading]);

    const reset = useCallback((query = initialSearchRef.current) => {
        initialSearchRef.current = query;
        setSearch(query);
        setDebouncedSearch(query);
        setFilters([]);
        setPage(0);
        setData([]);
        setHasMore(true);
    }, []);

    return {
        data,
        isLoading,
        hasMore,
        search,
        setSearch,
        filters,
        setFilters,
        loadMore,
        reset,
    };
};
