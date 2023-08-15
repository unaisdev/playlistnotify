import {useQuery} from '@tanstack/react-query';
import {getUserProfile, registerUser} from '../../../services/user';
import {useUserContext} from '../../../containers/userContext';
import {useEffect} from 'react';

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
  });

  if (user) {
    registerUser(user);
    setUser(user);
  }

  return {
    user,
  };
};
