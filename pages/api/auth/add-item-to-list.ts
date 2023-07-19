import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface UpdateRequest extends NextApiRequest {
  body: {
    id: string;
    itemId: string;
    type: 'movie' | 'tv';
  };
}

const AddItemToList = async (req: UpdateRequest, res: NextApiResponse) => {
  const { id, itemId, type } = req.body;
  const { client, database, listCollection } = await connectToDatabase();

  if (!id || !itemId || !type)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const query = { id: id };
    const doesListExist = await listCollection.findOne(query);
    if (!doesListExist) {
      if (type === 'movie') {
        await listCollection.insertOne({
          id: id,
          movieList: [itemId],
        });
      } else {
        await listCollection.insertOne({
          id: id,
          tvList: [itemId],
        });
      }
      return res.status(200).json({ message: 'success' });
    }
    const doesFilmExist = doesListExist?.movieList?.filter(
      (item) => item === itemId
    );
    const doesTvExist = doesListExist?.tvList?.filter(
      (item) => item === itemId
    );

    if (doesFilmExist?.length > 0 || doesTvExist?.length > 0) {
      return res.status(400).json({ message: 'Item already exists in list' });
    }
    let result;
    if (type === 'movie') {
      result = await listCollection.updateOne(query, {
        $push: { movieList: itemId },
      });
    } else {
      result = await listCollection.updateOne(query, {
        $push: { tvList: itemId },
      });
    }

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  } finally {
    await client.close();
  }
};

export default AddItemToList;
