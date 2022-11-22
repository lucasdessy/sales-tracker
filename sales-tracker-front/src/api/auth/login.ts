import { client } from "../client";

export const login = async (email: string, password: string) => {
  const { data } = await client.post('/login', { user:email, password });
  token = data.token;
  console.log('Logged in!, token: ', token);
}
export const logout = async () => {
  token = null;
};
export let token: string | null = null;