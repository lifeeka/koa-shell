const CamelCase = require('./helpers');

module.exports = (name: string) => `export default class ${CamelCase(name)}Error extends Error {
  constructor(message: string, status: number = 500) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
  }
}`;
