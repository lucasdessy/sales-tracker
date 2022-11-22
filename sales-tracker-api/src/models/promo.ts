import mongoose from "mongoose";

interface IPromo extends mongoose.Document {
  nome: string;
  data_validade: Date;
  id_produto: string;
  tipo: {
    tipo: string;
    valor: string;
    quantidade: string;
  }
}

const PromoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_validade: { type: Date, required: true },
  id_produto: { type: String, required: true },
  tipo: {
    tipo: { type: String, required: true },
    valor: { type: String, required: true },
    quantidade: { type: String, required: true }
  }
});

export const Promo = mongoose.model<IPromo>("Promo", PromoSchema, "promos");