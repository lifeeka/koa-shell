const CamelCase = require('./helpers');

module.exports = (name: string) => `export type ${CamelCase(name)}Type = {
  sample_text: string,
  sample_number: string
};
`;
