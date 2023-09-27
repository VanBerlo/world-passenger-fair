import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Sample from '../../models/Sample';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const data = await Sample.deleteMany();
    res.status(200).json({ status: 'success', data });
  } catch (e) {
    console.error(e);
    res.status(404).json({ status: 'error', message: 'Samples could not be deleted.' });
  }

}
