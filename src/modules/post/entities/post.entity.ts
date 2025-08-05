import { BaseEntity } from 'src/common/entities/base.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IPost } from '../interfaces/post.interface'

@Entity()
export class Post extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    type: 'text',
  })
  content: string

  @Column({
    type: 'timestamptz',
  })
  postedAt: string

  @Column()
  postedBy: string

  @Column({
    type: 'text',
    array: true,
  })
  tags: string[]
}
