export class FindAllRoleQuery {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly sortBy: string[],
        public readonly search: string,
        public readonly filter?: { [key: string]: string },
        public readonly baseUrl?: string,
    ) {}
}
