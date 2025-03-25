import {useMutation, useQuery} from '@tanstack/react-query';

import {queryClient} from '@app/lib/react-query';
import {QUERY_KEYS} from '@app/lib/queryKeys';
import {betaService} from '@app/services/beta/beta.service';

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
