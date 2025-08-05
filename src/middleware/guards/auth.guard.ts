import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { TokenExpiredError } from '@nestjs/jwt'
import { AuthGuard as AuthenGuard } from '@nestjs/passport'

import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard extends AuthenGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(ctx)
  }
}
