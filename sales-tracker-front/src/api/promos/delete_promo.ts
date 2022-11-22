import { token } from "../auth/login";
import { client } from "../client";
import { IPromo } from "./promo";

export const deletePromo = async (promo: IPromo) => {
  const { data } = await client.put(`/promos/${promo._id}`,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  return data as IPromo;
}