import { apiClient } from "../../services/apiClient";
import { ENDPOINTS } from "../../services/endpoints";
import type { LoginPayload, SignUpPayload } from "./auth.type";

export const loginApi = async (
  payload: LoginPayload
) => {
  return apiClient(ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signUpApi = async (
  payload: SignUpPayload
) => {
  return apiClient(ENDPOINTS.SIGNUP, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};