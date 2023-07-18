import React, { createContext, useState } from 'react';

interface ShareContextProps {
  isNavToggled: boolean | null;
  setIsNavToggled: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface NavCollapsedProviderProps {
  children: React.ReactNode;
}

const NavCollapsedContext = createContext<ShareContextProps>({
  isNavToggled: null,
  setIsNavToggled: () => {},
});

export const NavCollapsedProvider: React.FC<NavCollapsedProviderProps> = ({
  children,
}) => {
  const [isNavToggled, setIsNavToggled] = useState<boolean | null>(null);

  const value: ShareContextProps = {
    isNavToggled,
    setIsNavToggled,
  };

  return (
    <NavCollapsedContext.Provider value={value}>
      {children}
    </NavCollapsedContext.Provider>
  );
};

export default NavCollapsedContext;
