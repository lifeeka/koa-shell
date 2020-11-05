import SampleSeeder from './sample.seeder';
import type { SeederInterface } from './seeder.interface';

const seeders = {
  sample: SampleSeeder,
};

module.exports = (name: string): SeederInterface => seeders[name];
