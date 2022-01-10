import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { User } from "./User";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @ManyToOne(() => User, user => user.messages)
    user: User;
}