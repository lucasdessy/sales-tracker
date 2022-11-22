import { token } from "../auth/login";
import { client } from "../client";
import { IPromo } from "./promo";

export const changePromo = async (promo: IPromo) => {
  const { data } = await client.put(`/promos/${promo._id}`, { ...promo },
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  return data as IPromo;
}