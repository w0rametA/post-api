import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from '../entities/post.entity'
import { ArrayOverlap, FindManyOptions, Repository } from 'typeorm'
import { IPostCreate, IPostQueryPaginate } from '../interfaces/post.interface'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findById(id: number) {
    return await this.postRepository.findOne({
      where: {
        id,
      },
    })
  }

  async findPaginate(query: IPostQueryPaginate) {
    const { page, limit, filter } = query
    const condition: FindManyOptions<Post> = {
      skip: (page - 1) * limit,
      take: limit,
      where: {
        ...(filter &&
          filter.length > 0 && {
            tags: ArrayOverlap(filter),
          }),
      },
      order: {
        postedAt: 'DESC',
      },
    }

    const [data, total] = await this.postRepository.findAndCount(condition)

    return {
      total,
      data,
    }
  }

  async create(data: IPostCreate[]) {
    return await this.postRepository.save(data, {
      chunk: 200,
    })
  }

  async countPostData(): Promise<number> {
    return await this.postRepository.count()
  }
}
