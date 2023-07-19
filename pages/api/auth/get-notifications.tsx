import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface GetNotificationsRequest extends NextApiRequest {
  id: string;
}

const GetNotifications = async (
  req: GetNotificationsRequest,
  res: NextApiResponse
) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Missing id' });
  }

  const { client, database, notifications } = await connectToDatabase();
  try {
    const notificationItems = await notifications.find({ id: id }).toArray();

    return res.status(200).json({ message: 'success', notificationItems });
  } catch (error) {
    return res.status(500).json({ message: 'error' });
  } finally {
    client.close();
  }
};

export default GetNotifications;
