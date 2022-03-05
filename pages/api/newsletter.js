import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    // adding email to mongodb database
    const client = await MongoClient.connect(
      'mongodb+srv://next-user:ZiJ1Ui22z9k17iTZ@cluster0.j9t0v.mongodb.net/newsletter?retryWrites=true&w=majority'
    );
    const db = client.db();
    await db.collection('emails').insertOne({ email: userEmail });
    client.close();

    res.status(201).json({ message: 'Signed up' });
  }
}

export default handler;
