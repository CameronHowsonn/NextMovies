import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface GetListRequest extends NextApiRequest {
  body: {
    id: string;
  };
}

const GetList = async (req: GetListRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const { client, database, listCollection } = await connectToDatabase();

  if (!id) return res.status(400).json({ message: 'Missing required fields' });

  try {
    const query = { id: id };
    const list = await listCollection.findOne(query);
    if (!list) return res.status(400).json({ message: 'List does not exist' });
    return res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  } finally {
    await client.close();
  }
};

export default GetList;
