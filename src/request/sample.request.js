import ow from 'ow';
import Base from './base';
import type { RequestInterface } from './request.interface';
import SampleError from '../error/sample.error';

class SampleRequest extends Base implements RequestInterface {
  /**
   * Is Passed
   * @returns {boolean}
   */
  isPassed(): boolean {
    ow(this.getAll(), ow.object.exactShape({
      sample_text: ow.string,
      sample_number: ow.number,
    }));

    return true;
  }
}

/**
 * Request handler
 * @returns {Promise<void>}
 */
export default (exit: boolean) => async (ctx: any, next: any) => {
  const {
    header, body, query, method,
  } = ctx.request;

  const sampleRequest = new SampleRequest(header, method, body, query);
  ctx.state.request = sampleRequest;

  if (exit) {
    if (!sampleRequest.isPassed()) {
      throw new SampleError('Invalid', 422);
    }
  }

  await next();
};
