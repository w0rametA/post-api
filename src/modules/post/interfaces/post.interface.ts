import { IPaginateQuery } from 'src/common/interfaces/common.interface'

export interface IPost {
  id: number
  title: string
  content: string
  postedAt: string
  postedBy: string
  tags: string[]
}

export interface IPostCreate extends Omit<IPost, 'id'> {}

export interface IPostQueryPaginate extends IPaginateQuery {
  filter?: string[]
}
