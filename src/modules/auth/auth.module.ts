import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { env } from 'src/constants/environment.constant'
import { AuthService } from './services/auth.service'
import { UserService } from '../user/services/user.service'
import { AuthController } from './controllers/auth.controller'
import { JwtStrategy } from 'src/middleware/strategies/jwt.strategy'
import { AuthGuard } from 'src/middleware/guards/auth.guard'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: env.jwt.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, AuthGuard],
})
export class AuthModule {}
