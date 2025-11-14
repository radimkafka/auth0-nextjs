import { NextApiRequest, NextApiResponse } from 'next';
import { auth0 } from '../../lib/auth0';

export default auth0.withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth0.getSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { token, expiresAt } = await auth0.getAccessToken(req, res, {
      refresh: true
    });

    console.log('Token ends with:', token.slice(-20));

    return res.status(200).json({
      success: true,
      message: 'Token refreshed',
      expires_at: expiresAt,
      token: token.slice(-20)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});
