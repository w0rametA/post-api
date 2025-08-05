import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from '../entities/tag.entity'
import { Repository } from 'typeorm'
import { ITagCreate } from '../interfaces/tag.interface'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAllTags() {
    return await this.tagRepository.find()
  }

  async create(data: ITagCreate[]) {
    return await this.tagRepository.save(data)
  }

  async countTagData(): Promise<number> {
    return await this.tagRepository.count()
  }
}
