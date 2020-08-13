exports.response = (data: any, message: string = 'Successful!') => {
  const body = {};
  body.data = data;
  body.message = message;
  return body;
};
