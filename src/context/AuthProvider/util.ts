import { Api } from '../../services/api';
import { IAuth, IUser } from './types';

export function getLocalStorage(field: string) {
  const json = localStorage.getItem(field);

  if (!json) {
    return null;
  }

  const data = JSON.parse(json);
  return data ?? null;
}

export async function LoginRequest(
  email: string,
  password: string,
): Promise<IAuth | null> {
  try {
    const { data } = await Api.post<IAuth>('/auth', { email, password });

    if (data.authorized) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      Api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    }
    return data;
  } catch (error) {
    return null;
  }
}
