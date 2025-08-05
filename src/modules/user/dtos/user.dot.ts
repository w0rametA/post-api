import { ApiProperty } from '@nestjs/swagger'
import { IUser } from '../interfaces/user.interface'
import { IsNumber, IsString } from 'class-validator'

export class UserDTO implements IUser {
  @ApiProperty({
    type: Number,
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  id: number

  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  name: string

  @ApiProperty({
    type: String,
    description: 'User username',
    example: 'john.doe',
  })
  @IsString()
  username: string

  @ApiProperty({
    type: String,
    description: 'User password',
    example: 'password',
  })
  @IsString()
  password: string
}
