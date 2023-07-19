import { NextApiRequest, NextApiResponse } from 'next';

const GetVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body || req.query;

  if (!id) {
    res.status(400).json({ message: 'Id is required' });
  }

  await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      const video = data.results.filter((video) => video.type === 'Trailer');
      if (video.length === 0) {
        res.status(404).json({ message: 'Video not found' });
        return;
      }
      res.status(200).json(video[0]);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

export default GetVideo;
