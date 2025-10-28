export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};
