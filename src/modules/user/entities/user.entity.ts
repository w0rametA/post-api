import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IUser } from '../interfaces/user.interface'

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  username: string

  @Column({
    select: false,
  })
  password: string
}
