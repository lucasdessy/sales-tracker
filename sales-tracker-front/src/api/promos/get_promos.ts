import { client } from "../client";
import { IPromo } from "./promo";

export const getPromos = async () => {
  const { data } = await client.get('/promos');
  return data as IPromo[];
}