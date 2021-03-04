import sanitizeHtml from 'sanitize-html';
import shouldAuth from 'middleware/router/auth.middleware';
import response from 'response/default.response';
import type { CtxType } from '../../type/koa.type';

export default (Joi: any) => ({
  method: 'get',
  path: '/sample',
  validate: {
    query: {
      name: Joi.string().max(3),
    },
  },
  handler: [shouldAuth(), async (ctx: CtxType) => {
    const data = ctx.request.body;

    data.content = sanitizeHtml(data.content, {
      allowedTags: ['b', 'strong', 'i', 'em', 'u', 'p'],
      allowedAttributes: {},
      exclusiveFilter: (frame: any) => !frame.text.trim(),
      textFilter: (tagText: string) => tagText.trim(),
    });

    data.user = ctx.state.user;

    ctx.status = 201;
    ctx.body = response.response({}, 'Success message!');
  }],
});
