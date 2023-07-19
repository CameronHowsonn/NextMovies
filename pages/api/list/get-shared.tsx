import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface GetSharedRequest extends NextApiRequest {
  body: {
    id: string;
  };
}

const GetShared = async (req: GetSharedRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing id' });
  }

  const { client, database, sharedLists } = await connectToDatabase();

  // Get shared lists where user is an admin

  try {
    const sharedListsCursor = await sharedLists.find({ admins: id });
    const sharedListsArray = await sharedListsCursor.toArray();

    return res.status(200).json({ sharedLists: sharedListsArray });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error' });
  } finally {
    client.close();
  }
};

export default GetShared;
