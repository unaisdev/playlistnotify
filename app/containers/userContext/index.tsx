import {createContext, useContext, useState} from 'react';
import {User} from '../../services/types';

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => ({}),
});

export const useStateContext = () => useContext(UserContext);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [sharedUser, setSharedUser] = useState<User>(); // El estado que quieres compartir

  return (
    <UserContext.Provider value={{user: sharedUser, setUser: setSharedUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser};
};
