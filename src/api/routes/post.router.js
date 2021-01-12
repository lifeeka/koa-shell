import sanitizeHtml from 'sanitize-html';
import shouldAuth from 'middleware/router/auth.middleware';
import response from 'response/default.response';
import PostService from 'service/post.service';

export default (router: any) => {
  router.use(['/post'], shouldAuth());

  router.post('add', '/post', async (ctx: any) => {
    let { content } = ctx.request.body;
    content = sanitizeHtml(content, {
      allowedTags: ['b', 'strong', 'i', 'em', 'u', 'p'],
      allowedAttributes: {},
      exclusiveFilter: (frame: any) => !frame.text.trim(),
      textFilter: (tagText: string) => tagText.trim(),
    });

    const { user } = ctx.state;

    const post = new PostService();
    const postData = await post.addPost(user, content);

    ctx.body = response.response(postData, 'Success message!');
    ctx.status = 200;
  });

  router.delete('delete', '/post/:postId', async (ctx: any) => {
    const { postId } = ctx.params;

    const { user } = ctx.state;

    const post = new PostService();
    const postData = await post.deletePost(user, postId);

    ctx.body = response.response(postData, 'Success message!');
    ctx.status = 200;
  });

  router.get('list', '/post/list/:user?', async (ctx: any) => {
    const userId = ctx.params.user ?? ctx.state.user.uuid;

    const post = new PostService();
    const postList = await post.list(userId);

    ctx.body = response.response(postList, 'Success message!');
    ctx.status = 200;
  });

  return router;
};
