import SampleRepository from 'repository/sample.repository';
import SampleMiddleware from 'middleware/data/sample.middleware';
import type { SampleType } from 'types/sample.type';

export default class SampleService {
  repository: SampleRepository;

  constructor() {
    this.repository = new SampleRepository();
  }

  async save(param: any): SampleType {
    return this.repository.save(param).then(SampleMiddleware());
  }
}
