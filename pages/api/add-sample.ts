// pages/api/addDocument.js

import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Sample from '../../models/Sample';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Create a new document instance
  let _id = new mongoose.Types.ObjectId();
  console.log(req.body)
  const newDocument = new Sample({ _id, ...req.body});

  try {
    // Save the document to the database
    await newDocument.save();

    return res.status(201).json({ message: 'Sample data added successfully', document: newDocument });
  } catch (error) {
    console.error('Error while adding Sample document:', error);
    return res.status(500).json({ message: 'Something went wrong', failedDocument: newDocument });
  }
}
