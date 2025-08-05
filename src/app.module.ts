import { Module, OnModuleInit } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './modules/database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { SeedingModule } from './modules/seeding/seeding.module'
import { SeedingService } from './modules/seeding/seeding.service'
import { PostModule } from './modules/post/post.module'
import { TagModule } from './modules/tag/tag.module'
import { DataSource } from 'typeorm'
import * as postData from './data/posts.json'

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    SeedingModule,
    PostModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly dataSource: DataSource,
    private readonly seedingService: SeedingService,
  ) {}

  async onModuleInit() {
    await this.dataSource.synchronize()
    await this.seedingService.seedUser()
    await this.seedingService.seedFromJson(postData)
  }
}
