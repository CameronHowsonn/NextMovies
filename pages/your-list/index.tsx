import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const YourList: React.FC = () => {
  const { data: session, status } = useSession();
  const [listData, setListData] = useState(null);
  const [sharedListData, setSharedListData] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/auth/get-list`, {
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
          console.log(data);
          setListData(data.lists);
        })
        .catch((err) => console.log(err));

      fetch(`/api/list/get-shared`, {
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
    }
  }, [session]);

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
