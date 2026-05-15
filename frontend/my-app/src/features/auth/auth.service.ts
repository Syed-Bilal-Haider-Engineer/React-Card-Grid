import {
  loginApi,
  signUpApi,
} from "./auth.api";

export const loginUser = async (
  email: string,
  password: string
) => {
  return loginApi({
    email,
    password,
  });
};

export const signUpUserService = async (payload: any) => {
  return signUpApi(payload);
};