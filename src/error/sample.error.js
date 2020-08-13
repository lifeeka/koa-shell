export default class SampleError extends Error {
  constructor(message: string, status: number = 500) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
  }
}
