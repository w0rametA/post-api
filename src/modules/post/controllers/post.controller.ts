import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { HttpException } from 'src/common/exceptions/http.exception'
import { AuthGuard } from 'src/middleware/guards/auth.guard'

import { PostService } from '../services/post.service'
import { PostQueryPaginateDTO } from '../dtos/post.dto'

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name)

  constructor(private readonly postService: PostService) {}

  @Get('paginate')
  @UseGuards(AuthGuard)
  async getPostPaginate(@Query() query: PostQueryPaginateDTO) {
    try {
      const { data, total } = await this.postService.findPaginate(query)

      return { data, total }
    } catch (error) {
      this.logger.error(`error getPostPaginate `, error)
      throw new HttpException(error, 'error getPostPaginate')
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getPost(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.postService.findById(id)
    } catch (error) {
      this.logger.error(`error getPost `, error)
      throw new HttpException(error, 'error getPost')
    }
  }
}
