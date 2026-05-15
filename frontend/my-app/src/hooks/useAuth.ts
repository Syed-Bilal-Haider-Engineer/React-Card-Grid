import { useAuth as useAuthContext } from "../context/authContext";

export const useAuth = () => {
  return useAuthContext();
};