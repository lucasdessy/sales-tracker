import { Request, Response } from 'express';
import { Promo } from '../../../models/promo';
export const postPromosController = async (req: Request, res: Response) => {
  try {
    const { nome, data_validade, id_produto, tipo } = req.body;
    const promo = new Promo({
      nome,
      data_validade,
      id_produto,
      tipo
    });
    // Validate promo
    const errors = promo.validateSync();
    if (errors) {
      return res.status(400).json(errors);
    }
    // Save promo
    await promo.save();
    return res.status(201).json(promo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}