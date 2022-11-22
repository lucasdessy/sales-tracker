import { Request, Response } from 'express';
import { Promo } from '../../../models/promo';
export const deletePromoController = async (req: Request, res: Response) => {
  try{
  // Get the ID from the request params
  const id = req.params.id;
  // Get the promo
  const promo = await
    Promo.findById(id);
  // If the promo is null, then it does not exist
  if (!promo) {
    // Send a 404 response
    return res.status(404).send({
      message: `Promo with ID ${id} does not exist`,
    });
  }
  // Delete the promo
  await promo.remove();
  // Send the promo
    res.send(promo);
  } catch (err) {
    res.status(500).send();
  }
}