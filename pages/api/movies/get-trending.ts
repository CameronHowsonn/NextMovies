import { NextApiResponse } from 'next';
import { RequestBodyTimeframe } from '../../../types/movies';

const GetTrending = async (req: RequestBodyTimeframe, res: NextApiResponse) => {
  const { timeframe } = req.body;

  if (!timeframe) return res.status(400).json({ error: 'Missing timeframe' });

  await fetch(
    `https://api.themoviedb.org/3/trending/movie/${timeframe}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
