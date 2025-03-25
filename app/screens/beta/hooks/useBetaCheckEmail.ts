import {QUERY_KEYS} from '@app/lib/queryKeys';
import {betaService} from '@app/services/beta/beta.service';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useBetaCheckEmailMutation = () => {
  return useMutation({
    mutationFn: (email: string) => betaService.checkEmail(email),
    mutationKey: [QUERY_KEYS.BETA_CHECK_EMAIL],
  });
};
