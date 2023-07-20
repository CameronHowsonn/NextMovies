import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

const GetAll = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.body || req.query;

    const { client, database, sharedLists, listCollection } = await connectToDatabase();

    if(!id) return res.status(400).json({ error: 'Missing id' });

    try {
        const sharedListsCursor = await sharedLists.find({ admins: id });
        const sharedListsArray = await sharedListsCursor.toArray();

        const listCursor = await listCollection.find({ id: id });
        const listArray = await listCursor.toArray();   

        return res.status(200).json({ sharedLists: sharedListsArray, lists: listArray });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error' });
    }
    finally {
        client.close();
    }
}

export default GetAll;



