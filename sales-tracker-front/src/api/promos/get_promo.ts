import { client } from "../client";
import { IPromo } from "./promo";

export const getPromos = async (promoid:string) => {
  const { data } = await client.get(`/promos/${promoid}`);
  return data as IPromo;
}