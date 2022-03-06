import { MongoClient } from 'mongodb';
import {
  getAllDocuments,
  insertDocument,
  connectDatabase,
} from '../../../helpers/db-util';

async function handler(req, res) {
  // adding email to mongodb database
  const client = await connectDatabase();

  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await insertDocument(client, 'comments', newComment);
    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Comment added.', comment: newComment });
  }

  if (req.method === 'GET') {
    const comments = await getAllDocuments(
      client,
      'comments',
      { _id: -1 },
      { eventId: eventId }
    );

    res.status(200).json({ comments });
  }

  client.close();
}

export default handler;
