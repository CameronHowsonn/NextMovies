import { NextApiResponse } from 'next';
import { RequestBodyId } from '../../../types/movies';

const GetShowById = async (req: RequestBodyId, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: 'Missing id' });

  await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default GetShowById;
