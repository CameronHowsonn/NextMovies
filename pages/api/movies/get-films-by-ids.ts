import { NextApiResponse } from 'next';
import { RequestBodyLists } from '../../../types/movies';
const GetFilmsByIds = async (req: RequestBodyLists, res: NextApiResponse) => {
  const { lists } = req.body;
  if (!lists) return res.status(400).json({ error: 'Missing ids' });

  try {
    const listsWithFilms = lists.map((list) => {
      const films = list.films.map((id) => {
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`TMDB API returned status: ${response.status}`);
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error fetching movie ID', id, ':', error.message);
            return null; // Return null for failed requests
          });
      });
      return {
        ...list,
        films,
      };
    });

    const listsWithFilmsResolved = await Promise.all(
      listsWithFilms.map(async (list) => {
        const films = await Promise.all(list.films);
        return {
          ...list,
          films,
        };
      })
    );

    console.log('Resolved listsWithFilms:', listsWithFilmsResolved);
    return res.status(200).json({ lists: listsWithFilmsResolved });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error });
  }
};

export default GetFilmsByIds;
