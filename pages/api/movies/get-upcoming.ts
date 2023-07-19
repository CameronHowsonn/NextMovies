import { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '../../../types/movies';

const GetUpcoming = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.body;

  if (!page) {
    return res.status(400).json({ error: 'Page is required' });
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const todayDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    day < 10 ? `0${day}` : `${day}`
  }`;

  await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US& page=${page}&primary_release_date.gte=${todayDate}`
  )
    .then((response) => response.json())
    .then((data: Movie) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

export default GetUpcoming;
