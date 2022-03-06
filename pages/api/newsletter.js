import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // adding email to mongodb database
    const client = await connectDatabase();
    await insertDocument(client, 'newsletter', { email: userEmail });
    client.close();

    res.status(201).json({ message: 'Signed up' });
  }
}

export default handler;
