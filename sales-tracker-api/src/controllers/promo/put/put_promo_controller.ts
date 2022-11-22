import { Request, Response } from 'express';
import { Promo } from '../../../models/promo';
export const putPromoController = async (req: Request, res: Response) => {
  try {
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
    // Update the promo with old values and new values automatically
    promo.set(req.body);
    // Validate the promo
    const error = promo.validateSync();
    // If there is an error, then send a 400 response
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
    // Save the promo
    await promo.save();
    // Send the promo
    res.send(promo);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
