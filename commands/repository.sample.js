/* eslint flowtype/require-parameter-type: 0 */
const CamelCase = require('./helpers');

module.exports = (name) => `export default class ${CamelCase(name)}Repository {
}`;
