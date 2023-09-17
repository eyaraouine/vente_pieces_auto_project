
import { TimestampEntities } from "../../generic/entities/TimestampEntities";
import { Piece } from "../../piece/entities/piece.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
//@Entity('Cars')
@Entity()
export class Cars extends TimestampEntities  {
    @PrimaryGeneratedColumn()
    id: string;
    @Column({ nullable: false })
    brand: string;
    @Column({ nullable: false })
    model: string;
    @Column({ nullable: false })
    motorization: string;

    @Column({nullable:false})
    carCode : string;
    
    @OneToMany(() => Piece, piece => piece.cars)
    pieces: Piece[];
}

