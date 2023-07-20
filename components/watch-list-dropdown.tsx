import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DotLoader from './dot-loader';

interface ListData {
  movieId: number;
  setListDropdownOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const WatchListDropdown: React.FC<ListData> = ({
  movieId,
  setListDropdownOpen,
}) => {
  const [listData, setListData] = useState(null);
  const dropDownEle = useRef(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    fetch(`/api/list/get-counts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: session?.user?.id,
        type: 'movie',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setListData(data);
      });
  }, [session?.user?.id]);

  useEffect(() => {
    // Add an event listener to hide the dropdown if the user clicks outside of it
    const handleClickOutside = (e) => {
      if (dropDownEle.current && !dropDownEle.current.contains(e.target)) {
        setListDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (listType: string, listId: string) => {
    fetch(`/api/auth/add-item-to-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: listId,
        itemId: movieId,
        type: 'movie',
        listType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success' && data?.result.modifiedCount > 0) {
          toast.success(`Added to list!`);
          //   Now map over the relevant list and update the count
          if (listType === 'personal') {
            const newListData = listData.listData.map((list) => {
              if (list.listId === listId) {
                return {
                  ...list,
                  count: list.count + 1,
                };
              } else {
                return list;
              }
            });
            setListData({
              ...listData,
              listData: newListData,
            });
          }

          if (listType === 'shared') {
            const newListData = listData.sharedListData.map((list) => {
              if (list.listId === listId) {
                return {
                  ...list,
                  count: list.count + 1,
                };
              } else {
                return list;
              }
            });
            setListData({
              ...listData,
              sharedListData: newListData,
            });
          }
        } else if (
          data.message === 'success' &&
          data.result.modifiedCount === 0
        ) {
          toast.warn(`Already in list!`);
        } else {
          toast.error(`Error adding to list!`);
        }
      });
  };

  return (
    <DropdownContainer ref={dropDownEle}>
      {listData === null && <DotLoader absolute center />}
      {listData?.listData?.map((list) => (
        <DropdownItem
          key={list.name}
          onClick={() => handleClick('personal', list.listId)}
        >
          <span>
            <AiOutlinePlus />
            {list.name}
          </span>

          <span>{list.count}</span>
        </DropdownItem>
      ))}
      {listData?.sharedListData?.map((list) => (
        <DropdownItem
          key={list.name}
          onClick={() => handleClick('shared', list.listId)}
        >
          <span>
            <AiOutlinePlus />
            {list.name}
          </span>
          <span>{list.count}</span>
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
};

export default WatchListDropdown;

const DropdownContainer = styled.div`
  position: absolute;
  top: 0%;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  animation: slide-up 0.5s ease-in-out forwards;

  @keyframes slide-up {
    0% { 
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0%);
    }
`;

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: left;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
