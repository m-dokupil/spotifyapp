export interface LoginResponse {
  accessToken: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}