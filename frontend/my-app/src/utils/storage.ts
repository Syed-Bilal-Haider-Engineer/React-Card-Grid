export const getUser = () => {
  try {
    return JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch {
    return null;
  }
};

export const getUserEmail = () => {
  const user = getUser();
  return user?.user?.email || null;
};