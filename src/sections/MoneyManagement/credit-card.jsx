import React from "react"
import { BankingCurrentBalance } from "./banking-current-balance"

export function CreditCard({ creditCardData }) {
  return <BankingCurrentBalance list={creditCardData} />
}

