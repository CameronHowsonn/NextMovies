import { NextApiResponse } from 'next';
import { RequestBodyIdPageSort } from '../../../types/movies';

const GetFilmByGenre = async (
  req: RequestBodyIdPageSort,
  res: NextApiResponse
) => {
  const { id, page, sortBy } = req.body;

  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (!page) return res.status(400).json({ error: 'Missing page' });

  if (!sortBy) return res.status(400).json({ error: 'Missing sort' });

  await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sortBy}&with_genres=${id}&page=${page}`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default GetFilmByGenre;
