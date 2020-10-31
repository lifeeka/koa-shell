import mongoose from 'mongoose';

export default () => {
  mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database at ${global.config.db}`);
  });
  mongoose.connect(global.config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // eslint-disable-next-line no-console
  }).then(() => console.log('Mongodb is connected!'));
  mongoose.set('useCreateIndex', true);
};
