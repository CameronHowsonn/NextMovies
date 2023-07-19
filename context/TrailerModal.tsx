// Create a context that will be used to pass the trailer url to the modal component aswell as a function to toggle the modal on and off.

import { createContext, useState } from 'react';

interface TrailerContextProps {
  trailerUrl: string | null;
  setTrailerUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen?: boolean;
}

interface TrailerProviderProps {
  children: React.ReactNode;
}

const TrailerContext = createContext<TrailerContextProps>({
  trailerUrl: null,
  setTrailerUrl: () => {},
  setIsModalOpen: () => {},
  isModalOpen: false,
});

export const TrailerProvider: React.FC<TrailerProviderProps> = ({
  children,
}) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const value: TrailerContextProps = {
    trailerUrl,
    setTrailerUrl,
    setIsModalOpen,
    isModalOpen,
  };

  return (
    <TrailerContext.Provider value={value}>{children}</TrailerContext.Provider>
  );
};

export default TrailerContext;
