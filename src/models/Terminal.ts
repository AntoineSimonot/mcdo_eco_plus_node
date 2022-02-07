import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class Terminal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serial: number;

    @OneToOne(() => User, user => user.terminal)
    user: User;
}