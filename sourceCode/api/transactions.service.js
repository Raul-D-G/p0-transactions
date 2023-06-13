const { TransactionRepository } = require("../database");
const repository = new TransactionRepository();

// All Business logic will be here
module.exports = {
  create: (data, callBack) => {
    repository
      .CreateTransaction({
        idTransport: data.idTransport,
        idTransportator: data.idTransportator,
        idExpeditor: data.idExpeditor,
      })
      .then((transactionsID) => {
        callBack(null, transactionsID);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  getTranzactiiByExpeditorId(idExpeditor, callBack) {
    repository
      .GetTranzactiiByExpeditorId(idExpeditor)
      .then((transactionsuri) => {
        callBack(null, transactionsuri);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  deleteTransaction: (transportID, callBack) => {
    repository
      .DeleteTransaction(transportID)
      .then((deletedCount) => {
        callBack(null, deletedCount > 0);
      })
      .catch((error) => {
        callBack(error);
      });
  },
};
