import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

const CreateList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, description } = req.body || req.query;

  if (!id || !name || !description)
    return res.status(400).json({ message: 'Missing id or name' });

  const { client, listCollection } = await connectToDatabase();

  try {
    const listCursor = await listCollection.find({ listId: `${id}|${name}` });
    const listArray = await listCursor.toArray();

    if (listArray.length > 0)
      return res.status(400).json({ message: 'List already exists' });

    const newList = await listCollection.insertOne({
      id: id,
      name: name,
      movieList: [],
      listId: `${id}|${name}`,
      description: description,
    });

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error' });
  } finally {
    client.close();
  }
};

export default CreateList;
