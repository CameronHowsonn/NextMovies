import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface MarkNotificationsReadRequest extends NextApiRequest {
  body: {
    id: string;
  };
}

const MarkNotificationsRead = async (
  req: MarkNotificationsReadRequest,
  res: NextApiResponse
) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing id' });
  }

  const { client, database, notifications } = await connectToDatabase();

  try {
    await notifications.updateMany({ id: id }, { $set: { read: true } });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(500).json({ message: 'error' });
  } finally {
    client.close();
  }
};

export default MarkNotificationsRead;
