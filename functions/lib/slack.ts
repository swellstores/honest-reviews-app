export async function notifyReviewCreated(req: SwellRequest, settings: SwellData): Promise<void> {
  if (!settings.slack?.enabled) return;

  const { store, data: review } = req;

  const webhookUrl = settings.slack?.notify_url;
  const manageLink = `<${store.admin_url}/collections/app_${req.appId}_reviews/${review.id}|Manage review>`;
  const displayNameLink = await getCustomerDisplayNameLink(req, review.account_id);

  const message = {
    text: `Review submitted by ${displayNameLink} titled "${review.title}" (${review.rating} star). ${manageLink}`,
  };

  await sendSlackMessage(webhookUrl, message);
}

export async function notifyCommentCreated(req: SwellRequest, settings) {
  if (!settings.slack?.enabled) return;

  const { store, data: comment } = req;

  const webhookUrl = settings.slack?.notify_url;
  const manageLink = `<${store.admin_url}/collections/app_${req.appId}_reviews/${comment.parent_id}|Manage comments>`;
  const displayNameLink = await getCustomerDisplayNameLink(req, comment.account_id);

  const message = {
    text: `Comment submitted by ${displayNameLink} "${comment.body}". ${manageLink}`,
  };

  await sendSlackMessage(webhookUrl, message);
}

export async function notifyRewardCreated(req: SwellRequest, settings: SwellData): Promise<void> {
  if (!settings.slack?.enabled || !settings.slack?.notify_url) return;

  const { store, data: reward } = req;

  const review = await req.swell.get('/reviews/{id}', {
    id: reward.review_id,
  });

  const webhookUrl = settings.slack.notify_url;
  const manageLink = `<${store.admin_url}/collections/app_${req.appId}_reviews/${reward.review_id}|Manage review>`;
  const displayNameLink = await getCustomerDisplayNameLink(req, review.account_id);
  const currency = reward.$locale?.amount ? Object.keys(reward.$locale?.amount)[0] : reward.amount;

  const message = {
    text: `Reward applied for review by ${displayNameLink} titled "${review.title}" (${currency} ${reward.amount}). ${manageLink}`,
  };

  await sendSlackMessage(webhookUrl, message);
}

export async function getCustomerDisplayNameLink(
  req: SwellRequest,
  accountId: string
): Promise<string> {
  const { store, swell } = req;

  const account = await swell.get('/accounts/{id}', {
    id: accountId,
    $content: true,
    $app: req.appId,
  });
  if (!account) {
    console.error('Account not found', accountId);
    return;
  }

  const displayName = account?.$app[req.appId]?.name || 'Unnamed';

  return `<${store.admin_url}/customers/${accountId}|${displayName}>`;
}

export async function sendSlackMessage(
  webhookUrl: string,
  message: { text: string }
): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error('Error sending Slack message', err);
  }
}
