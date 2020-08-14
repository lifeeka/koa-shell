import mongoose from 'mongoose';

const { Schema } = mongoose;

const SampleModel = new Schema(
  {
    sample_text: {
      type: String,
      required: [true, 'Name is required'],
    },
    sample_number: {
      type: Number,
      required: [true, 'Name is required'],
    },
  },
);

export default mongoose.model('SampleModel', SampleModel);
