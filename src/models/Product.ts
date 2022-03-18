import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { File } from "./File";
import { OrderToProduct } from "./OrderToProduct";
import { ProductToIngredient } from "./ProductToIngredient";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    custom: boolean;

    @OneToMany(() => ProductToIngredient, pti => pti.product, 
    )
    pti: ProductToIngredient[];

    @OneToMany(() => OrderToProduct, otp => otp.product,{
    })
    otp: OrderToProduct[];

    @ManyToOne(() => File, file => file.product)
    file: File;
}