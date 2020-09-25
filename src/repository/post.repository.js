import PostModel from 'model/post.model';
import type { CommentType, PostType } from 'type/post.type';
import mongoose from 'mongoose';
import CommentModel from '../model/comment.model';
import type { UserMiniType } from '../type/user.type';

export default class PostRepository {
  /**
   * Save Post
   * @param param
   * @returns {Promise<PostType>}
   */
  async addPost(param: PostType | any): Promise<PostType> {
    const post = new PostModel(param);
    return post.save();
  }

  /**
   * Delete Post
   * @returns {Promise<PostType>}
   * @param user
   * @param postId
   */
  async deletePost(user: string, postId: string): Promise<PostType> {
    const post = await PostModel.findOne({ uuid: postId, user });
    CommentModel.deleteMany({ post: post._id }).exec();
    post.deleteOne();
    return post;
  }

  /**
   * Delete Comment
   * @returns {Promise<PostType>}
   * @param user
   * @param commentId
   */
  async deleteComment(user: string, commentId: string): Promise<PostType> {
    const comment = await CommentModel.findOne({ uuid: commentId, user });
    comment.deleteOne();
    return comment;
  }

  /**
   * Save Post
   * @returns {Promise<PostType>}
   * @param user
   * @param filters
   */
  async listPost(user: string, filters: any): Promise<PostType[]> {
    return PostModel
      .aggregate([
        { $match: { user } },
        {
          $lookup: {
            from: 'comments',
            let: { postId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$$postId', '$post'] } } },
              { $sort: { created_at: -1 } },
              { $limit: 1 },
              { $sort: { created_at: 1 } },
            ],
            as: 'comments',
          },
        },
        { $sort: { created_at: -1 } },
      ])
      .exec();
  }

  /**
   * Save Comment
   * @param param
   * @returns {Promise<PostType>}
   */
  async addComment(param: PostType | any): Promise<PostType> {
    const comment = new CommentModel(param);
    return comment.save();
  }

  async getComments(postId: string, lastCommentId: string, limit: number): Promise<CommentType[]> {
    return CommentModel.aggregate([
      { $match: { post: mongoose.Types.ObjectId(postId.toString()) } },
      { $match: { _id: { $lt: mongoose.Types.ObjectId(lastCommentId.toString()) } } },
      { $sort: { created_at: -1 } },
      { $limit: limit },
      { $sort: { created_at: 1 } },
    ])
      .exec();
  }

  async getPostByUuid(uuid: string): Promise<PostType> {
    return PostModel.findOne({ uuid });
  }

  async getCommentByUuid(uuid: string): Promise<PostType> {
    return CommentModel.findOne({ uuid });
  }
}
