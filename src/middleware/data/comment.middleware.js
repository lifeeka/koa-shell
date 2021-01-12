import type { CommentType } from 'type/post.type';

export default () => (comment: CommentType) => {
  const data: CommentType = {
    content: comment.content,
    user: comment.user,
    uuid: comment.uuid,
    reference: comment.reference ?? null,
    parent_comment: comment.parent_comment ?? null,
    created_at: comment.created_at,
    updated_at: comment.updated_at,
  };
  return data;
};
