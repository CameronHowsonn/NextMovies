import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface UpadateRequest extends NextApiRequest {
  body: {
    username: string;
    id: string;
  };
}

const UpdateDbUser = async (req: UpadateRequest, res: NextApiResponse) => {
  const { username, id } = req.body;
  const { client, database, userCollection } = await connectToDatabase();

  try {
    const query = { id: id };
    // Find the document by id and update it
    const result = await userCollection.updateOne(query, {
      $set: { username: username },
    });
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return res.status(200).json({ message: ' success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  } finally {
    await client.close();
  }
};

export default UpdateDbUser;
