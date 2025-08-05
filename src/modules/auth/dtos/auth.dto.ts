import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { UserDTO } from 'src/modules/user/dtos/user.dot'
import { IAuthRespond, IAuthUser } from '../interfaces/auth.interface'
import { IsString } from 'class-validator'

export class LoginDTO extends PickType(UserDTO, ['username', 'password']) {}

export class AuthUserDTO
  extends OmitType(UserDTO, ['password'])
  implements IAuthUser {}

export class AuthRespondDTO implements IAuthRespond {
  @ApiProperty({
    description: 'Authentication token',
  })
  @IsString()
  token: string

  @ApiProperty({
    description: 'User Information',
    type: AuthUserDTO,
  })
  user: AuthUserDTO
}
