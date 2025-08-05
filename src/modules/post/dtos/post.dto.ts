import { ApiProperty, OmitType } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { BaseEntityDTO } from 'src/common/dtos/common.dto'
import { IPost, IPostQueryPaginate } from '../interfaces/post.interface'

export class PostDTO extends BaseEntityDTO implements IPost {
  @ApiProperty({
    type: Number,
    description: 'Post ID',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    type: String,
    description: 'Post title',
    example: 'Getting Started with NestJS',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    type: String,
    description: 'Post content',
    example: 'This is the content of the post...',
  })
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty({
    type: String,
    description: 'When the post was posted',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsString()
  @IsNotEmpty()
  postedAt: string

  @ApiProperty({
    type: String,
    description: 'Username of the person who posted',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  postedBy: string

  @ApiProperty({
    type: [String],
    description: 'Tags associated with the post',
    example: ['tech', 'programming'],
  })
  @IsArray()
  tags: string[]
}

export class PostCreateDTO extends OmitType(PostDTO, ['id']) {}

export class PostQueryPaginateDTO implements IPostQueryPaginate {
  @ApiProperty({
    type: Number,
    description: 'Page number',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  page: number

  @ApiProperty({
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  @IsNumber()
  @Type(() => Number)
  limit: number

  @ApiProperty({
    type: String,
    description: 'Search term',
    example: 'nestjs',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string

  @ApiProperty({
    type: () => [String],
    description: 'Filter by tags',
    example: ['tech', 'programming'],
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim())
    }
    return value as string[]
  })
  filter?: string[]
}
