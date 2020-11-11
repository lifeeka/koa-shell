const CamelCase = require('./helpers');

module.exports = (name: string) => `export default class ${CamelCase(name)}Seeder extends Base implements SeederInterface {
  seed(): boolean {
    console.log('It worked!');
    return true;
  }
}
`;
