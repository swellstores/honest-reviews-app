import { notifyCommentCreated } from './lib/slack';
import { autoCommentActions } from './lib/comments';

export const config: SwellConfig = {
  description: 'Handle review submission features',
  model: {
    events: ['review.comment.created'],
  },
};

export default async function (req: SwellRequest) {
  const settings = await req.swell.settings();

  await Promise.all([autoCommentActions(req, settings), notifyCommentCreated(req, settings)]);
}
