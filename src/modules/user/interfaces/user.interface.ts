import { IBaseEntity } from 'src/common/interfaces/common.interface'

export interface IUser extends IBaseEntity {
  id: number
  name: string
  username: string
  password: string
}

export interface IUserCreate extends Omit<IUser, 'id'> {}
