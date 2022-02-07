import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Product } from "./Product";


@Entity()
export class File extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    location: string

    @OneToMany(() => Product, product => product.file)
    product: Product[];

    @OneToMany(() => Ingredient, ingredient => ingredient.file)
    ingredient: Ingredient[];
}