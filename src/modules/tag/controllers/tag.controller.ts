import { Controller, Get, Logger, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { HttpException } from 'src/common/exceptions/http.exception'
import { AuthGuard } from 'src/middleware/guards/auth.guard'
import { TagService } from '../services/tag.service'

@ApiBearerAuth()
@ApiTags('Tag')
@Controller('tag')
export class TagController {
  private readonly logger = new Logger(TagController.name)

  constructor(private readonly tagService: TagService) {}

  @Get('list')
  @UseGuards(AuthGuard)
  async getTagList() {
    try {
      const tagList = await this.tagService.findAllTags()

      return tagList
    } catch (error) {
      this.logger.error(`error getTagList `, error)
      throw new HttpException(error, 'error getTagList')
    }
  }
}
