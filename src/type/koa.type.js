export type CtxType<T> = {
  request: {
    method: string,
    url: string,
    query: T,
    header: T,
    body: T
  },
  params: T,
  state: T,
  response: {
    status: number,
    message: string,
    header: string
  },
  originalUrl: string,
  req: T,
  res: T,
  socket: T
};
