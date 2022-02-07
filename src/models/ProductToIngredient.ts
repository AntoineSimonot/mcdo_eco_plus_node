import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId, BaseEntity } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Product } from "./Product";


@Entity()
export class ProductToIngredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    public productToIngredientId!: number;

    @ManyToOne(() => Product, product => product.pti, {
    })
    product: Product;

    @ManyToOne(() => Ingredient, ingredient => ingredient.pti, 
        { cascade: true, onDelete: 'CASCADE' }
    )
    ingredient: Ingredient;
}