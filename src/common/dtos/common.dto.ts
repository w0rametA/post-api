import { ApiProperty } from '@nestjs/swagger'
import { IBaseEntity } from '../interfaces/common.interface'

export class BaseEntityDTO implements IBaseEntity {
  @ApiProperty({
    type: String,
    description: 'Created at',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  createdAt?: string

  @ApiProperty({
    type: String,
    description: 'Updated at',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  updatedAt?: string

  @ApiProperty({
    type: String,
    description: 'Deleted at',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  deletedAt?: string
}
