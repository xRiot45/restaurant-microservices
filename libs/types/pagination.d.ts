export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    search?: string;
    filter?: { [key: string]: string };
}

export interface PaginationMeta {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy?: [string, 'ASC' | 'DESC'][];
    search?: string;
    filter?: { [key: string]: string };
}

export interface PaginationLinks {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
    links: PaginationLinks;
}
