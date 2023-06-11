const mongoose = require("mongoose");

const transactionEfectuatSchema = new mongoose.Schema(
  {
    idTransport: { type: String, required: true },
    idTransportator: { type: String, required: true },
    idExpeditor: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
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
