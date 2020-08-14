import type { SampleType } from 'type/sample.type';

export default () => (sample: any) => {
  const data: SampleType = {
    sample_text: sample.sample_text,
    sample_number: sample.sample_number,
  };
  return data;
};
