import {useMutation} from '@tanstack/react-query';

import {BetaSignupResponse} from './types';
import {queryClient} from '@app/lib/react-query';
import {QUERY_KEYS} from '@app/lib/queryKeys';
import {betaService} from './beta.service';

export const useBetaSignupMutation = () => {
  return useMutation({
    mutationFn: (email: string) => betaService.signup(email),
    onSuccess: () => {
      queryClient.invalidateQueries([
        {
          queryKey: QUERY_KEYS.USER_PROFILE,
        },
      ]);
    },
  });
};
