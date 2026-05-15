// services/apiClient.ts
export const apiClient = async (
  url: string,
  options?: RequestInit
) => {
  const res = await fetch(
    import.meta.env.VITE_API_URL + url,
    options
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API Error");
  }

  return data;
};