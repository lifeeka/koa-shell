const CamelCase = require('./helpers');

module.exports = (name: string) => `export default class ${CamelCase(name)}Service {
  // your contents
}
`;
