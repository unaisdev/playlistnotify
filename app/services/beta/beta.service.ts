import axios from 'axios';
import {Platform} from 'react-native';

import {API_URL} from '../constants';

const BETA_ERRORS = {
  SIGNUP_FAILED: 'Failed to sign up for beta',
} as const;

interface BetaSignup {
  email: string;
  createdAt: string;
  deviceInfo: {
    platform: string;
    version: string;
    osVersion?: string;
  };
}

interface BetaSignupResponse {
  success: boolean;
  message: string;
  userId?: string;
  createdAt: string;
}

export const betaService = {
  async signup(email: string): Promise<BetaSignupResponse> {
    try {
      const betaSignup: BetaSignup = {
        email,
        createdAt: new Date().toISOString(),
        deviceInfo: {
          platform: Platform.OS,
          version: Platform.Version.toString(),
          // osVersion: Platform.constants?.Release || '',
        },
      };

      const response = await axios.post<BetaSignupResponse>(
        `${API_URL}/beta/signup`,
        betaSignup,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || BETA_ERRORS.SIGNUP_FAILED,
        );
      }
      throw error;
    }
  },
};
