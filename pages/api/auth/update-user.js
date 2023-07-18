import { connectToDatabase } from '../../../lib/mongodb';

const UpdateDbUser = async (req, res) => {
  const { username, id } = req.body;
  const { client, database, collection } = await connectToDatabase();

  try {
    const query = { id: id };
    // Find the document by id and update it
    const result = await collection.updateOne(query, {
      $set: { username: username },
    });
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return res.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'error' }, { status: 500 });
  } finally {
    await client.close();
  }
};

export default UpdateDbUser;
