export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  confirmPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: { accessToken: string };
  errors?: Record<string, string[]>;
}
