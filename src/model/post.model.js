import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostModel = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    uuid: {
      type: String,
      maxlength: 36,
      minlength: 36,
      unique: true,
      required: [true, 'uuid is required'],
    },
    user: {
      type: String,
      maxlength: 36,
      minlength: 36,
      required: [true, 'User is required'],
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
  },
);

export default mongoose.model('PostModel', PostModel, 'posts');
