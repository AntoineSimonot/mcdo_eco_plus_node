import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class OrderToProduct extends BaseEntity  {
    @PrimaryGeneratedColumn()
    orderToProductId!: number;

    @ManyToOne(() => Order, order => order.otp, {
    })
    order: Order;

    @ManyToOne(() => Product, product => product.otp, 
    )
    product: Product;


    @ManyToMany(type => Ingredient, ingredient => ingredient.pti, {
        cascade: true,
    })
    @JoinTable({name: 'excluded_ingredient'})
    excluded_ingredients: Ingredient[];
}