import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { File } from "./File";
import { Product } from "./Product";
import { ProductToIngredient } from "./ProductToIngredient";

@Entity()
export class Ingredient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @OneToMany(() => ProductToIngredient, pti => pti.ingredient, {
    })
    pti: ProductToIngredient[];

    @ManyToOne(() => File, file => file.ingredient)
    file: File;
}