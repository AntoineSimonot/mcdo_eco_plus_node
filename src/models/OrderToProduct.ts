import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class OrderToProduct extends BaseEntity  {
    @PrimaryGeneratedColumn()
    orderToProductId!: number;

    @ManyToOne(() => Order, order => order.otp, 
    )
    order: Order;

    @ManyToOne(() => Product, product => product.otp, 
    { nullable:true, cascade: true, onDelete: 'CASCADE' }
    )
    product: Product;


    @ManyToMany(type => Ingredient, ingredient => ingredient.pti, 
    {
        nullable:true,cascade: true, onDelete: 'CASCADE'
    })
    @JoinTable({name: 'excluded_ingredient'})
    excluded_ingredients: Ingredient[];
}