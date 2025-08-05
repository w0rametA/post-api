export interface ITag {
  id: number
  name: string
}

export interface ITagCreate extends Pick<ITag, 'name'> {}
