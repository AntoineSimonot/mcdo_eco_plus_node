import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { Terminal } from "./Terminal";

export enum UserRole {
    USER = "user",
    KITCHEN = "kitchen",
    ADMIN = "admin",
    TERMINAL = "terminal"
}


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: UserRole,
    })
    role: UserRole;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @OneToOne(() => Terminal, terminal => terminal.user)
    @JoinColumn()
    terminal: Terminal;

    @Column()
    password: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}