import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://cameronplainhowson:${process.env.MONGO_PASSWORD}@cluster0.dxctdbt.mongodb.net/?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {
  console.log('connecting to database');
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const database = client.db('users');
  const collection = database.collection('users');

  return {
    client,
    database,
    collection,
  };
};
