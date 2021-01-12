import sanitizeHtml from 'sanitize-html';
import shouldAuth from 'middleware/router/auth.middleware';
import response from 'response/default.response';
import PostService from 'service/post.service';

export default (router: any) => {
  router.use(['/post'], shouldAuth());

  router.post('add', '/comment', async (ctx: any) => {
    const data = ctx.request.body;

    data.content = sanitizeHtml(data.content, {
      allowedTags: ['b', 'strong', 'i', 'em', 'u', 'p'],
      allowedAttributes: {},
      exclusiveFilter: (frame: any) => !frame.text.trim(),
      textFilter: (tagText: string) => tagText.trim(),
    });

    data.user = ctx.state.user;

    const postService = new PostService();
    const commentData = await postService.addComment(data);

    ctx.body = response.response(commentData, 'Success message!');
    ctx.status = 200;
  });

  router.delete('delete', '/comment/:commentId', async (ctx: any) => {
    const { commentId } = ctx.params;

    const { user } = ctx.state;

    const post = new PostService();
    const commentData = await post.deleteComment(user, commentId);

    ctx.body = response.response(commentData, 'Success message!');
    ctx.status = 200;
  });

  router.get('list', '/comment', async (ctx: any) => {
    const { post } = ctx.request.query;
    const { lastCommentId } = ctx.request.query;

    const postService = new PostService();
    const commentData = await postService.getComments(post, lastCommentId);

    ctx.body = response.response(commentData, 'Success message!');
    ctx.status = 200;
  });

  return router;
};
