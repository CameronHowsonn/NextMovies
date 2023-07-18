import { NextApiResponse } from 'next';
import { RequestBodyTimeframePage } from '../../../types/movies';

const GetTrending = async (
  req: RequestBodyTimeframePage,
  res: NextApiResponse
) => {
  const { timeframe, page } = req.body;

  if (!timeframe) return res.status(400).json({ error: 'Missing timeframe' });

  if (!page) return res.status(400).json({ error: 'Missing page' });

  await fetch(
    `https://api.themoviedb.org/3/trending/person/${timeframe}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default GetTrending;
