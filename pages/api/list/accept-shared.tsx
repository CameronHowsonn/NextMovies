import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface AcceptSharedRequest extends NextApiRequest {
  body: {
    id: string;
    admin: string;
  };
}

const AcceptShared = async (req: AcceptSharedRequest, res: NextApiResponse) => {
  const { id, admin } = req.body;

  if (!id || !admin) {
    return res.status(400).json({ message: 'Missing id or admin' });
  }

  const { client, database, sharedLists } = await connectToDatabase();

  try {
    const sharedList = await sharedLists.findOne({ id: id });

    if (!sharedList) {
      return res.status(404).json({ message: 'List not found' });
    }

    const admins = sharedList.admins;
    const adminsAccepted = sharedList.adminsAccepted;

    if (adminsAccepted[admin]) {
      return res.status(400).json({ message: 'Admin has already accepted' });
    }

    adminsAccepted[admin] = true;
    admins.push(admin);

    await sharedLists.updateOne(
      { id: id },
      {
        $set: {
          admins: admins,
          adminsAccepted: adminsAccepted,
          listId: id,
        },
      }
    );

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error' });
  } finally {
    client.close();
  }
};

export default AcceptShared;
