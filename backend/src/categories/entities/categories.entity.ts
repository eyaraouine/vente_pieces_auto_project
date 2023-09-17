import { Piece } from 'src/piece/entities/piece.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PiecesInfos } from '../interfaces/piecesInfos';

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  label: string;
  @Column({nullable:true})
  image: string;
  @Column({nullable:true})
  @ManyToOne(() => Categories, {cascade: true, onDelete:"CASCADE"})
  @JoinColumn({name:"parent"})
  parent: number;
  @Column({ type: 'json', nullable: true })
  piecesInfos: PiecesInfos[];
}


