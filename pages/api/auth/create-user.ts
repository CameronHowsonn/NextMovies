import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

const CreateUser = async (id: string) => {
  const { client, database, userCollection } = await connectToDatabase();
  try {
    const query = { id: id };
    const userExists = await userCollection.findOne(query);
    if (userExists) {
      return NextResponse.json(
        { message: 'User exists', user: userExists },
        { status: 200 }
      );
    } else {
      console.log('User does not exist');
      const result = await userCollection.insertOne(query);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      return NextResponse.json(
        { message: 'User created', user: result },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
};

export default CreateUser;
