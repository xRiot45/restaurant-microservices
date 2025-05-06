export class UpdateRoleCommand {
    constructor(
        public readonly roleId: number,
        public readonly name: string,
        public readonly isActive?: boolean,
    ) {}
}
