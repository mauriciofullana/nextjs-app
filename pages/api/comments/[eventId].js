import { MongoClient } from 'mongodb';

async function handler(req, res) {
  // adding email to mongodb database
  const client = await MongoClient.connect(
    'mongodb+srv://next-user:ZiJ1Ui22z9k17iTZ@cluster0.j9t0v.mongodb.net/events?retryWrites=true&w=majority'
  );
  const db = client.db();

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

    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Comment added.', comment: newComment });
  }

  if (req.method === 'GET') {
    const comments = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments });
  }

  client.close();
}

export default handler;
