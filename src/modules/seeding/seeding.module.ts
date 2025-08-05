import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../user/entities/user.entity'
import { SeedingService } from './seeding.service'
import { UserService } from '../user/services/user.service'
import { Post } from '../post/entities/post.entity'
import { Tag } from '../tag/entities/tag.entity'
import { PostService } from '../post/services/post.service'
import { TagService } from '../tag/services/tag.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Tag])],
  providers: [SeedingService, UserService, PostService, TagService],
  exports: [SeedingService],
})
export class SeedingModule {}
