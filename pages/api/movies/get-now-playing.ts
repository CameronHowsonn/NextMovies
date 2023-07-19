import { NextApiRequest, NextApiResponse } from 'next';

const GetNowPlaying = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ statusCode: 500, message: error.message });
    });
};

export default GetNowPlaying;
