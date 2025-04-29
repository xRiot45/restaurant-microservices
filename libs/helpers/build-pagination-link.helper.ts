interface BuildLinkParams {
    baseUrl: string;
    page: number;
    limit: number;
    sortBy?: string[];
    search?: string;
    filter?: Record<string, any>;
}

export default function buildPaginationLink({
    baseUrl,
    page,
    limit,
    sortBy = [],
    search,
    filter = {},
}: BuildLinkParams): string {
    const sortByQuery = sortBy.length ? `&sortBy=${sortBy.join(',')}` : '';
    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : '';
    const filterQuery = Object.entries(filter)
        .map(([key, value]) => `&filter.${key}=${encodeURIComponent(value as string)}`)
        .join('');

    return `${baseUrl}?limit=${limit}&page=${page}${sortByQuery}${searchQuery}${filterQuery}`;
}
