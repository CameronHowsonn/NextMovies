import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const YourList: React.FC = () => {
  const { data: session, status } = useSession();
  const [listData, setListData] = useState(null);
  const [sharedListData, setSharedListData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await fetch(`/api/auth/get-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setListData(data.lists);
        })
        .catch((err) => console.log(err));

      await fetch(`/api/list/get-shared`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSharedListData(data);
        })
        .catch((err) => console.log(err));
    };

    if (session?.user?.id) {
      getData();
    }
  }, [session]);

  useEffect(() => {
    const getFilms = async () => {
      try {
        const response = await fetch(`/api/movies/get-films-by-ids`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lists: [
              ...listData?.map((list) => {
                return {
                  id: list.id,
                  name: list.name,
                  films: list.movieList,
                };
              }),
              ...sharedListData?.sharedLists?.map((list) => {
                return {
                  id: list.id,
                  name: list.name,
                  films: list.movieList,
                };
              }),
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch films: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
      } catch (err) {
        console.log('Error fetching films:', err);
      }
    };

    if (sharedListData?.sharedLists?.length > 0 && listData?.length > 0) {
      getFilms();
    }
  }, [listData, sharedListData]);

  return (
    <>
      <h1>Your List</h1>
      {listData && (
        <>
          {listData?.map((list) => {
            return (
              <div key={list.id}>
                <p>{list.name}</p>
              </div>
            );
          })}
        </>
      )}
      <hr />
      <h1>Shared Lists</h1>
      {sharedListData && (
        <>
          {sharedListData?.sharedLists?.map((list) => {
            return (
              <div key={list.id}>
                <p>{list.name}</p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default YourList;
