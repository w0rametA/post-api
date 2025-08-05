import { Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/services/user.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/modules/user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { AuthRespondDTO } from '../dtos/auth.dto'
import { ISignTokenPayload } from '../interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByUsername(username)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user
      return result
    }
    return null
  }

  login(user: Omit<User, 'password'>): AuthRespondDTO {
    const payload: ISignTokenPayload = {
      id: user.id,
      name: user.name,
      username: user.name,
    }

    const token = this.jwtService.sign(payload)

    return {
      token,
      user: payload,
    }
  }
}
