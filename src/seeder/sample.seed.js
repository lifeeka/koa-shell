export default class SampleSeeder extends Base implements SeederInterface {
  seed(): boolean {
    console.log('It worked!');
    return true;
  }
}
