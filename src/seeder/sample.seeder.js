import faker from 'faker';
import type { SeederInterface } from './seeder.interface';
import Base from './base';
import SampleRepository from '../repository/sample.repository';

export default class SampleSeeder extends Base implements SeederInterface {
  repository: SampleRepository;

  constructor() {
    super();
    this.repository = new SampleRepository();
  }

  async seed(instance: number): boolean {
    const seeds = await Array(instance).fill().map(async () => {
      const data = {
        sample_text: faker.name.findName(),
        sample_number: faker.random.number(),
      };
      return this.repository.save(data);
    });
    await Promise.all(seeds);
  }
}
