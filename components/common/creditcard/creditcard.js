class CreditCard {
  constructor({ card_id, card_name, inclusions, exclusions, base_rate, minimum_spend, maximum_cashback, conditions_link, image_link, transhistory }) {
    this.card_id = card_id
    this.card_name = card_name
    this.inclusions = inclusions
    this.exclusions = exclusions
    this.base_rate = base_rate
    this.minimum_spend = minimum_spend
    this.maximum_cashback = maximum_cashback
    this.conditions_link = conditions_link
    this.image_link = image_link
    this.cardhistory = transhistory.filter(t => t.card_id == card_id).reverse()
    const [amount_spent, total_cashback] = this.cardhistory.reduce(
      (x, y) => [x[0] + y.amount, x[1] + y.amount * y.cashback_rate / 100],
      [0, 0])
    this.amount_spent = amount_spent
    this.total_cashback = total_cashback
  }

  isExcluded(mcc, merchant) {
    return this.exclusions.includes(mcc) || this.exclusions.includes(merchant)
  }

  getCashBackRate(mcc, merchant) {
    const rates = this.inclusions
      .filter((i) => i.mcc?.includes(mcc) || i.names?.includes(merchant))
      .map((i) => i.rate);
    return rates.length ? Math.max(rates) : this.base_rate;
  }
}

export default CreditCard;