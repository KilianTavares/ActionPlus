import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (req.method === "GET") {
    const results = [
      { id: 1, title: `Search result for: ${q}`, type: "movie" },
      { id: 2, title: `Another result for: ${q}`, type: "tv" },
    ];

    res.status(200).json({ query: q, results });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
