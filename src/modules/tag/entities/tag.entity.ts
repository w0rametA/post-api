import { BaseEntity } from 'src/common/entities/base.entity'
import { ITag } from '../interfaces/tag.interface'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tag extends BaseEntity implements ITag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
