import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentModel = new Schema(
  {
    content: {
      type: String,
      validate: [function (v: any): boolean {
        return !!((v.length > 3 || this.reference?.length));
      }],
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'PostModel',
      validate: [function (v: any): boolean {
        return !!((v instanceof mongoose.Types.ObjectId || this.reference?.length));
      }],
    },
    parent_comment: {
      type: mongoose.Types.ObjectId,
      ref: 'CommentModel',
      default: null,
    },
    user: {
      type: String,
      maxlength: 36,
      minlength: 36,
      required: [true, 'User is required'],
    },
    uuid: {
      type: String,
      maxlength: 36,
      minlength: 36,
      unique: true,
      required: [true, 'uuid is required'],
    },
    reference: {
      maxlength: 36,
      minlength: 36,
      type: String,
      default: null,
      validate: [function (v: any): boolean {
        return !!((v?.length || this.content?.length));
      }],
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
  },
);

CommentModel.pre('validate', function (next: any) {
  if (this.post) {
    this.post = mongoose.Types.ObjectId(this.post.toString());
  }
  next();
});

export default mongoose.model('CommentModel', CommentModel, 'comments');
