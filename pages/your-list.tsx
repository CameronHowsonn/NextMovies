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
          setListData(data.list);
        });

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
          console.log(data);
        });
    }
  }, [session]);

  return (
    <>
      <h1>Your List</h1>
      {listData && (
        <>
          {listData?.movieList.map((item) => (
            <p>{item}</p>
          ))}
        </>
      )}
      <hr />
      <h1>Shared Lists</h1>
      {sharedListData && (
        <>
          {sharedListData?.sharedLists?.map((list) => {
            console.log(list);
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
