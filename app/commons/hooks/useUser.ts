import {useEffect, useMemo} from 'react';

import {useQuery} from '@tanstack/react-query';

import {getUserProfile, registerUser} from '@app/services/user';
import {useUserContext} from '@app/containers/UserContext';

export const fetchUserProfile = () => {
  const {setUser} = useUserContext();

  //TODO: hook
  const {
    data: user,
    isLoading,
    error,
    failureReason,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserProfile,
    retry: 3,
  });

  useEffect(() => {
    if (user) {
      registerUser(user);
      setUser(user);
    }
  }, [user]);

  return {
    user,
  };
};
