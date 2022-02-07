import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { File } from "./File";
import { OrderToProduct } from "./OrderToProduct";
import { Terminal } from "./Terminal";
import { User } from "./User";

export enum OrderStatus {
    KITCHEN = "kitchen",
    FINISHED = "finished",
}

@Entity()
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    orderId!: number;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.KITCHEN
    })
    status: OrderStatus;

    @Column()
    price: number;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @ManyToOne(() => File, file => file.product)
    file: File;

    @OneToMany(() => OrderToProduct, otp => otp.order, {
    })
    otp: OrderToProduct[];
    
}