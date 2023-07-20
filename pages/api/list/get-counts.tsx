import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';

interface getCountRequest extends NextApiRequest {
  body: {
    id: string;
    type: 'movie' | 'tv';
  };
}

const GetCounts = async (req: getCountRequest, res: NextApiResponse) => {
  const { id, type } = req.body;

  const { listCollection, sharedLists } = await connectToDatabase();

  const list = listCollection.find({ id: id }) as any;
  const sharedList = sharedLists.find({ admins: id }) as any;

  const lists = await list.toArray();
  const sharedListsArray = await sharedList.toArray();

  // Return the name and count of the type
  const listData = lists.map((list) => {
    return {
      name: list.name,
      listId: list.listId,
      count: type === 'movie' ? list.movieList.length : list.tvList.length,
    };
  });

  const sharedListData = sharedListsArray.map((list) => {
    return {
      name: list.name,
      listId: list.listId,
      count: type === 'movie' ? list.movieList.length : list.tvList.length,
    };
  });

  res.status(200).json({ listData, sharedListData });
};

export default GetCounts;
