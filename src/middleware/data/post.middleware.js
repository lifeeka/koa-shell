import type { CommentType, PostType } from 'type/post.type';
import commentMiddleware from 'middleware/data/comment.middleware';

export default () => (post: PostType) => {
  const data: PostType = {
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    user: post.user,
    uuid: post.uuid,
    comments: post.comments
      ?.map((comment: CommentType) => commentMiddleware()(comment)) ?? [],
  };
  return data;
};
