import PostRepository from 'repository/post.repository';
import postMiddleware from 'middleware/data/post.middleware';
import commentMiddleware from 'middleware/data/comment.middleware';
import type { CommentType, PostType } from 'type/post.type';
import { v4 as uuid4 } from 'uuid';
import type { UserMiniType } from '../type/user.type';

export default class PostService {
  repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  /**
   * Add Post
   * @returns {Promise<PostType>}
   * @param user
   * @param content
   */
  async addPost(user: UserMiniType, content: string): Promise<PostType> {
    const param = {
      user: user.uuid,
      content,
      uuid: uuid4(),
    };
    return this.repository.addPost(param).then(postMiddleware());
  }

  /**
   * Delete Post
   * @returns {Promise<PostType>}
   * @param user
   * @param postId
   */
  async deletePost(user: UserMiniType, postId: string): Promise<PostType> {
    return this.repository.deletePost(user.uuid, postId).then(postMiddleware());
  }

  /**
   * Add Post
   * @returns {Promise<PostType>}
   * @param user
   * @param filters
   */
  async list(user: string, filters: any): Promise<PostType> {
    return this.repository
      .listPost(user, filters)
      .then((posts: PostType[]) => posts.map((post: PostType) => postMiddleware()(post)));
  }

  /**
   * Add Comment
   * @returns {Promise<PostType>}
   * @param param
   */
  async addComment(param: any): Promise<PostType> {
    let postId = null;
    if (param.post) {
      const post = await this.repository.getPostByUuid(param.post);
      postId = post?.id ?? null;
    }
    let parentCommentId = null;
    if (param.parent_comment) {
      const parentComment = await this.repository.getCommentByUuid(param.parent_comment);
      parentCommentId = parentComment?.id ?? null;
    }

    const comment = {
      content: param.content,
      post: postId,
      parent_comment: parentCommentId,
      user: param.user.uuid,
      uuid: uuid4(),
      reference: param.reference ?? null,
    };
    return this.repository.addComment(comment).then(postMiddleware());
  }

  /**
   * Delete Comment
   * @returns {Promise<PostType>}
   * @param user
   * @param commentId
   */
  async deleteComment(user: UserMiniType, commentId: string): Promise<CommentTypeType> {
    return this.repository.deleteComment(user.uuid, commentId).then(postMiddleware());
  }

  /**
   * Add Comment
   * @returns {Promise<PostType>}
   * @param postId
   * @param lastCommentId
   * @param limit
   */
  async getComments(postId: string, lastCommentId: string, limit: number = 5): Promise<PostType> {
    const post = await this.repository.getPostByUuid(postId);
    const lastComment = await this.repository.getCommentByUuid(lastCommentId);

    return this.repository.getComments(post._id, lastComment._id, limit)
      .then((comments: CommentType[]) => comments
        .map((comment: CommentType) => commentMiddleware()(comment)));
  }
}
