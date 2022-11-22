import { token } from "../auth/login";
import { client } from "../client";
import { IPromo } from "./promo";

export const createPromo = async (promo: IPromo) => {
  const { data } = await client.post('/promos', { promo },
    {
    headers: {
      authorization: `Bearer ${token}`
    }
    },
  );
  return data as IPromo;
}