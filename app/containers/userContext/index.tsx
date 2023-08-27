import React, {createContext, useContext, useState} from 'react';

import {User, UserAddedPlaylistsResponse} from '../../services/types';

type UserContextType = {
  user: User | undefined;
  userNotifiedPlaylists: UserAddedPlaylistsResponse[];
  setUser: (user: User) => void;
  setUserNotifiedPlaylists: (playlists: UserAddedPlaylistsResponse[]) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  userNotifiedPlaylists: [],
  setUser: () => ({}),
  setUserNotifiedPlaylists: () => ({}),
});

export const useStateContext = () => useContext(UserContext);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [sharedUser, setSharedUser] = useState<User>(); // El estado que quieres compartir
  const [userNotifiedPlaylists, setUserNotifiedPlaylists] = useState<
    UserAddedPlaylistsResponse[]
  >([]); // El estado que quieres compartir

  return (
    <UserContext.Provider
      value={{
        user: sharedUser,
        setUser: setSharedUser,
        userNotifiedPlaylists: userNotifiedPlaylists,
        setUserNotifiedPlaylists: setUserNotifiedPlaylists,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const {user, setUser, userNotifiedPlaylists, setUserNotifiedPlaylists} =
    useContext(UserContext);
  return {user, setUser, userNotifiedPlaylists, setUserNotifiedPlaylists};
};
