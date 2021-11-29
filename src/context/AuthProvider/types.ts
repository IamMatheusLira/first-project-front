export interface IUser {
  id?: string;
  email?: string;
  name?: string;
}

export interface IAuth {
  user?: IUser;
  token?: string;
  authorized?: boolean;
}

export interface IAuthContext extends IAuth {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}
