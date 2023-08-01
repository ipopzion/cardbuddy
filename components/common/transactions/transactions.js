import MerchantList from "../../../assets/database/merchant_details"

class Transaction {
  constructor({ transactionId, timestamp, card_id, cashback_rate, amount, merchant_id }) {
    this.transactionId = transactionId
    this.timestamp = timestamp
    this.card_id = card_id
    this.cashback_rate = cashback_rate
    this.amount = amount
    this.merchant_id = merchant_id
  }

  getMerchantName(merchants) {
    return merchants.filter(m => m.merchant_id == this.merchant_id)[0]?.merchant_name ?? "New Merchant"
  }
}

export default Transaction;