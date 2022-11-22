import { Request, Response } from 'express';
import { Promo } from '../../../models/promo';
export const getPromosController = async (req: Request, res: Response) => {
  // Get the ID from the request params
  const id = req.params.id;
  // If the ID is not null, then we are getting a promo by ID
  if (id) {
    // Get the promo by ID
    const promo = await Promo.findById(id);
    // If the promo is null, then it does not exist
    if (!promo) {
      // Send a 404 response
      res.status(404).send({
        message: `Promo with ID ${id} does not exist`,
      });
    } else {
      // Send the promo
      res.send(promo);
    }
  } else {
    // Get all the promos
    const promos = await Promo.find();
    // Send the promos
    res.send(promos);
  }
}