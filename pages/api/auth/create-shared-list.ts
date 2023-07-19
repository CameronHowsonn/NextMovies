import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

const CreateSharedList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, description, userSubmitted, userRequested, id } = req.body;

  if (!name || !description || !userSubmitted || !userRequested || !id) {
    return res.status(400).json({ error: 'Missing body parameter' });
  }

  const newSharedList = {
    id,
    name,
    description,
    admins: [userSubmitted],
    adminsAccepted: {
      [userSubmitted]: true,
      [userRequested]: false,
    },
    movieList: [],
    tvList: [],
  };

  const { client, database, sharedLists, notifications, userCollection } =
    await connectToDatabase();

  try {
    const query = { id: id };
    const doesListExist = await sharedLists.findOne(query);
    if (doesListExist) {
      return res.status(400).json({ error: 'List already exists' });
    }

    const userRequestedExists = await userCollection.findOne({
      id: userRequested,
    });
    if (!userRequestedExists) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    await sharedLists.insertOne(newSharedList);

    const notification = {
      id: userRequested,
      type: 'sharedListRequest',
      message: `${userRequestedExists.username} has requested to share a list with you`,
      read: false,
      listId: id,
    };

    await notifications.insertOne(notification);

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  } finally {
    await client.close();
  }
};

export default CreateSharedList;
