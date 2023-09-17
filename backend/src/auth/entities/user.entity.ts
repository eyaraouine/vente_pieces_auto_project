import { IsEmail } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
    length: 50,
  })
  username: string;
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.PROVIDER,
  })
  role: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
