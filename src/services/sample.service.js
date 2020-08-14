import SampleRepository from 'repository/sample.repository';
import SampleMiddleware from 'middleware/data/sample.middleware';
import type { SampleType } from 'types/sample.type';

export default class SampleService {
  repository: SampleRepository;

  constructor() {
    this.repository = new SampleRepository();
  }

  /**
   * Save Samples
   * @param param
   * @returns {Promise<SampleType>}
   */
  async save(param: any): Promise<SampleType> {
    return this.repository.save(param).then(SampleMiddleware());
  }
}
