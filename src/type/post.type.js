export type CommentType = {
  content: string,
  post: string,
  parent_comment: string,
  user: string,
  uuid: string,
  reference?: string,
  created_at?: Date,
  updated_at?: Date
};
export type PostType = {
  content: string,
  uuid: string,
  user: string,
  comments?: CommentType[],
  created_at?: Date,
  updated_at?: Date
};
