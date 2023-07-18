import { NextApiRequest, NextApiResponse } from 'next';

const GetList = async (req: NextApiRequest, res: NextApiResponse) => {
  await fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default GetList;
