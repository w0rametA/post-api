import { Injectable } from '@nestjs/common'
import { env } from 'src/constants/environment.constant'
import { UserService } from 'src/modules/user/services/user.service'
import { PostService } from '../post/services/post.service'
import { TagService } from '../tag/services/tag.service'
import { IPostCreate } from '../post/interfaces/post.interface'

@Injectable()
export class SeedingService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly tagService: TagService,
  ) {}

  async seedUser() {
    const userCount = await this.userService.countUserData()

    if (userCount === 0) {
      console.log('User table is empty, seeding user data...')
      await this.userService.create({
        name: 'admin',
        username: env.initialUser.username,
        password: env.initialUser.password,
      })
      console.log('User data seeding completed!')
    } else {
      console.log('Database already has data, skipping seed.')
    }
  }

  async seedFromJson(jsonData: any[]) {
    const postCount = await this.postService.countPostData()
    const tagCount = await this.tagService.countTagData()

    if (tagCount === 0) {
      console.log('Tag table is empty, seeding user data...')

      const uniqueTagNames = [...new Set(jsonData.flatMap((post) => post.tags))]

      await this.tagService.create(uniqueTagNames.map((name) => ({ name })))

      console.log('Tag data seeding completed!.')
    } else {
      console.log('Tag already has data, skipping seed')
    }

    if (postCount === 0) {
      console.log('Post table is empty, seeding user data...')

      const chunkSize = 200
      for (let i = 0; i < jsonData.length; i += chunkSize) {
        const chunk = jsonData.slice(i, i + chunkSize)

        const posts: IPostCreate[] = chunk.map((postData) => ({
          title: postData.title,
          content: postData.content,
          postedAt: postData.postedAt,
          postedBy: postData.postedBy,
          tags: postData.tags,
        }))

        await this.postService.create(posts)

        console.log(`Processed ${i + chunk.length}/${jsonData.length} posts`)
      }
      console.log('Post data seeding completed!.')
    } else {
      console.log('Post already has data, skipping seed')
    }
  }
}
