import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { env } from 'src/constants/environment.constant'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwt.secret,
      passReqToCallback: true,
    })
  }
  validate(payload: any) {
    try {
      const user = this.getUser(payload)

      if (!user) {
        return false
      }
      return user
    } catch (error) {
      return false
    }
  }

  getUser(payload: any) {
    return payload
  }
}
