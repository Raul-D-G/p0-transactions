const { TranzactionModel } = require("../models");

//Dealing with data base operations
class TransactionRepository {
  async CreateTransaction({ idTransport, idTransportator, idExpeditor }) {
    try {
      const existingTransaction = await this.GetTranzactieByTransport(
        idTransport
      );

      if (existingTransaction) {
        throw new Error("Pentru acest transport este o tranzactie in curs");
      }

      const transactions = new TranzactionModel({
        idTransport,
        idTransportator,
        idExpeditor,
      });

      // Salvăm transactions în baza de date
      const savedTransaction = await transactions.save();

      // Returnăm ID-ul transactionsului salvat
      return savedTransaction._id;
    } catch (error) {
      throw error;
    }
  }

  async GetTranzactieByTransport(idTransport) {
    try {
      return await TranzactionModel.findOne({ idTransport: idTransport });
    } catch (error) {
      throw error;
    }
  }

  async GetTranzactiiByExpeditorId(idExpeditor) {
    try {
      return await TranzactionModel.find({ idExpeditor: idExpeditor });
    } catch (error) {
      throw error;
    }
  }

  async DeleteTransaction(transportID) {
    try {
      const result = await TranzactionModel.deleteOne({
        idTransport: transportID,
      });
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransactionRepository;
