import React, {createContext, useContext, useState} from 'react';

import {User, UserAddedPlaylistsResponse} from '../../services/types';

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => ({}),
});

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [sharedUser, setSharedUser] = useState<User>();

  return (
    <UserContext.Provider
      value={{
        user: sharedUser,
        setUser: setSharedUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser};
};
