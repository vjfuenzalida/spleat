import { NextApiRequest, NextApiResponse } from 'next';
import { items } from '@/models/items';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allItems = await items.all(); // Assuming you have a method to fetch all items
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}