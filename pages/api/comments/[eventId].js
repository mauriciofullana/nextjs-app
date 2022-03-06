import {
  getAllDocuments,
  insertDocument,
  connectDatabase,
} from '../../../helpers/db-util';

async function handler(req, res) {
  // adding email to mongodb database
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to database failed!' });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Comment added.', comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Inserting comment to database failed!' });
    }
  }

  if (req.method === 'GET') {
    let comments;
    try {
      comments = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Getting comments from database failed!' });
    }
  }

  client.close();
}

export default handler;
