import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ITag } from '../interfaces/tag.interface'
import { BaseEntityDTO } from 'src/common/dtos/common.dto'

export class TagDTO extends BaseEntityDTO implements ITag {
  @ApiProperty({
    type: Number,
    description: 'Tag ID',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    type: String,
    description: 'Tag name',
    example: 'technology',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}
