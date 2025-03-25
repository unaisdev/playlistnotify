export interface BetaSignupRequest {
  email: string;
  deviceInfo: {
    platform: string;
    version: string;
    osVersion: string;
  };
}

export interface BetaSignupResponse {
  success: boolean;
  message: string;
  userId?: string;
  createdAt: string;
}
