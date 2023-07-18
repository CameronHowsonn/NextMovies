import { NextResponse } from 'next/server';
import { connectToDatabase } from './../../../lib/mongodb';

const GetUser = async (id) => {
  const { client, database, collection } = await connectToDatabase();
  try {
    const query = { id: id };
    const user = await collection.findOne(query);
    return NextResponse.json({ message: 'User exists', user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await client.close();
  }
};

export default GetUser;
