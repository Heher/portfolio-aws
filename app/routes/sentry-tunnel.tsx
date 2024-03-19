import { json, type ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const SENTRY_HOST = 'o918579.ingest.us.sentry.io';
  const SENTRY_PROJECT_IDS = ['5861922'];

  try {
    const envelope = await request.text();
    const piece = envelope.split('\n')[0];
    const header = JSON.parse(piece);
    const dsn = new URL(header['dsn']);
    const project_id = dsn.pathname?.replace('/', '');

    if (dsn.hostname !== SENTRY_HOST) {
      // console.log('invalid sentry hostname', dsn.hostname);
      throw new Error(`Invalid sentry hostname: ${dsn.hostname}`);
    }

    if (!project_id || !SENTRY_PROJECT_IDS.includes(project_id)) {
      throw new Error(`Invalid sentry project id: ${project_id}`);
    }

    const upstream_sentry_url = `https://${SENTRY_HOST}/api/${project_id}/envelope/`;
    await fetch(upstream_sentry_url, { method: 'POST', body: envelope });

    return json({}, { status: 200 });
  } catch (e) {
    console.error('error tunneling to sentry', e);
    return json({ error: 'error tunneling to sentry' }, { status: 500 });
  }
}
