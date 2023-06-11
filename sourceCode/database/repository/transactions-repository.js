const { TranzactionModel } = require("../models");

//Dealing with data base operations
class TransactionRepository {
  async CreateTransaction({ idTransport, idTransportator, idExpeditor }) {
    try {
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

  async GetTranzactiiByExpeditorId(idExpeditor) {
    try {
      return await TranzactionModel.find({ idExpeditor: idExpeditor });
    } catch (error) {
      throw error;
    }
  }

  async DeleteTransaction(id) {
    try {
      const result = await TranzactionModel.deleteOne({ _id: id });
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransactionRepository;
