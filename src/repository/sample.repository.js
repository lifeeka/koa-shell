import Sample from 'models/sample.model';
import type { SampleType } from '../types/sample.type';

export default class SampleRepository {
  /**
   * Save Samples
   * @param param
   * @returns {Promise<Array>}
   */
  async save(param: SampleType | any): Promise<Array> {
    const data = {
      sample_text: param.sample_text,
      sample_number: param.sample_number,
    };
    const sample = new Sample(data);
    return sample.save();
  }
}
