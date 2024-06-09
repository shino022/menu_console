type Actions = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export type { Actions };
