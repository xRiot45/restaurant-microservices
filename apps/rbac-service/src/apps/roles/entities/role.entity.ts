import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive: boolean;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    deletedAt: Date;

    constructor(partial: Partial<RoleEntity>) {
        Object.assign(this, partial);
    }
}
