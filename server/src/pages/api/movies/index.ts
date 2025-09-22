import { NextApiRequest, NextApiResponse } from 'next';

const movies = [
  {
    id: 1,
    title: "Action Hero",
    genre: "Action",
    year: 2024,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/example1.jpg"
  },
  {
    id: 2,
    title: "Thriller Night",
    genre: "Thriller",
    year: 2024,
    rating: 7.8,
    poster: "https://image.tmdb.org/t/p/w500/example2.jpg"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ movies });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}