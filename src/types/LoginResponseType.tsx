export interface LoginResponse {
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
  type: string;
}
