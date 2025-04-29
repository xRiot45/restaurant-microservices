import { PaginationQuery } from 'libs/types/pagination';

export default function parsePaginationQuery(query: Record<string, any>): PaginationQuery {
    const filter: Record<string, string> = {};
    Object.keys(query).forEach((key) => {
        if (key.startsWith('filter.')) {
            const filterKey = key.split('.')[1];
            filter[filterKey] = query[key];
        }
    });

    return {
        page: Number(query.page) || 1,
        limit: Number(query.limit) || 10,
        sortBy: query.sortBy,
        search: query.search || '',
        filter,
    };
}
