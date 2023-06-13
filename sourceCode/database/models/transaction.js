const mongoose = require("mongoose");

const transactionEfectuatSchema = new mongoose.Schema(
  {
    idTransport: { type: String, required: true, unique: true },
    idTransportator: { type: String, required: true },
    idExpeditor: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        ret.id = ret._id; // Adaugă câmpul id bazat pe _id
        delete ret._id; // Șterge câmpul _id
      },
    },
    timestamps: true,
  }
);

const TranzactieEfectuata = mongoose.model(
  "TranzactieEfectuata",
  transactionEfectuatSchema
);

module.exports = TranzactieEfectuata;
