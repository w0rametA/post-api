import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import { IUserCreate } from '../interfaces/user.interface'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  private readonly salt: number = 10

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOneOrFail({
      where: {
        id,
      },
    })
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
      select: ['id', 'name', 'username', 'password'],
    })
  }

  async create(payload: IUserCreate) {
    const { name, username, password } = payload

    const hashedPassword = await bcrypt.hash(password, this.salt)

    const newUser = await this.userRepository.save({
      name,
      username,
      password: hashedPassword,
    })

    const { password: _, ...restUser } = newUser

    return restUser
  }

  async countUserData(): Promise<number> {
    return await this.userRepository.count()
  }
}
