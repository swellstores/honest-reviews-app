import { autoApproveActions } from './approval';

export async function autoCommentActions(req: SwellRequest, settings: SwellData): Promise<void> {
  const { swell, data: comment } = req;

  const review = await swell.get('/reviews/{id}', {
    id: comment.parent_id,
  });

  await autoApproveActions(req, 'reviews', req.data, review, settings);
}
