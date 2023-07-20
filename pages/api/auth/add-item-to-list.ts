import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface UpdateRequest extends NextApiRequest {
  body: {
    id: string;
    itemId: string;
    type: 'movie' | 'tv';
    listType: 'personal' | 'shared';
  };
}

const AddItemToList = async (req: UpdateRequest, res: NextApiResponse) => {
  const { id, itemId, type, listType } = req.body;
  const { client, database, listCollection, sharedLists } =
    await connectToDatabase();

  if (!id || !itemId || !type)
    return res.status(400).json({ message: 'Missing required fields' });
  try {
    const query = { listId: id };
    const update = {
      $addToSet: { [type === 'movie' ? 'movieList' : 'tvList']: itemId },
    };

    let result;

    if (listType === 'personal') {
      result = await listCollection.updateOne(query, update);
    }

    if (listType === 'shared') {
      result = await sharedLists.updateOne(query, update);
    }

    if (!result) {
      return res.status(400).json({ message: 'List not found', result });
    }

    return res.status(200).json({ message: 'success', result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: 'error' });
  } finally {
    await client.close();
  }
};

export default AddItemToList;
