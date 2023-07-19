import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://cameronplainhowson:${process.env.MONGO_PASSWORD}@cluster0.dxctdbt.mongodb.net/?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const database = client.db('users');
  const userCollection = database.collection('users');
  const listCollection = database.collection('lists');
  const sharedLists = database.collection('shared_lists');
  const notifications = database.collection('notifications');

  return {
    client,
    database,
    userCollection,
    listCollection,
    sharedLists,
    notifications,
  };
};
