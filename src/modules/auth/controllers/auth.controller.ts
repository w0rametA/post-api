import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthService } from '../services/auth.service'
import { AuthRespondDTO, LoginDTO } from '../dtos/auth.dto'
import { HttpException } from 'src/common/exceptions/http.exception'

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login Successfully.',
    type: AuthRespondDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() param: LoginDTO) {
    try {
      const { username, password } = param

      const user = await this.authService.validateUser(username, password)
      if (!user) {
        throw new BadRequestException('Invalid Credential')
      }

      return this.authService.login(user)
    } catch (error) {
      this.logger.error(`error login `, error)
      throw new HttpException(error, 'error login')
    }
  }
}
