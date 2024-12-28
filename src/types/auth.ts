export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}