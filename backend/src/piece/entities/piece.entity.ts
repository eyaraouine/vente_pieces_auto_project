import { TimestampEntities } from "../../generic/entities/TimestampEntities";
import { Cars } from "../../cars/entities/cars.entity";
import { Categories } from "../../categories/entities/categories.entity";
import { Providers  } from "../../providers/entities/providers.entity";
import { Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('piece')
export class Piece extends  TimestampEntities{
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    piece: string; 
    @Column()
    pieceCode: string;
    @Column({nullable:true})
    image: string;
    @Column()
    price: number;
    @Column()
    description: string;
    @Column()
    constructorReference: string;
    @Column({nullable:true})
    comments: string; 
    @ManyToOne(() => Providers , (provider) => provider.pieces, { onDelete: 'CASCADE', cascade: true, eager: true})
    @JoinColumn()
    provider: Providers ;
    @ManyToOne(() => Cars, (cars) => cars.pieces, { cascade: true, eager: true })
    cars: Cars;
    @ManyToOne(() => Categories, { eager: true, onDelete: "RESTRICT" })
    category: Categories;
    @ManyToOne(() => Categories, { eager: true, onDelete: "RESTRICT" })
    subCategory:Categories;
}
