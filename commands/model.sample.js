const CamelCase = require('./helpers');

module.exports = (name: string) => `import mongoose from 'mongoose';

const { Schema } = mongoose;

const ${CamelCase(name)}Model = new Schema(
  {
    ${name}_text: {
      type: String,
      required: [true, 'Name is required'],
    },
    ${name}_number: {
      type: Number,
      required: [true, 'Name is required'],
    },
  },
);

export default mongoose.model('${CamelCase(name)}Model', ${CamelCase(name)}Model);
`;
