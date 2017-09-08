var Promise = require('bluebird')

import { gas } from '../scripts/testConfig.js'
import { waitUntilTransactionsMined } from '../scripts/helpers.js'

/**
 * @description
 * @param contract
 * @param sender
 * @param receiver
 * @returns
 */
const transferOwnership = async (contract, sender, receiver) => {
  let params = { from: sender, gas: gas }
  let txn = await contract.transferOwnership(receiver, params)
  let txnReceipt = await waitUntilTransactionsMined(txn.tx)
  return txnReceipt
}

/**
 * @description
 * @param contracts
 * @param sender
 * @param receiver
 */
const transferOwnerships = async (contracts, sender, receiver) => {
  let promises = contracts.map(function (contract) { transferOwnership(contract, sender, receiver) })
  await Promise.all(promises)
}

/**
 * @description
 * @param contract
 * @param owner
 * @returns
 */
const lockOwnership = async (contract, owner) => {
  let params = { from: owner, gas: gas }
  let txn = await contract.lockOwnership(owner, params)
  let txnReceipt = await waitUntilTransactionsMined(txn.tx)
  return txnReceipt
}

module.exports = {
  transferOwnership,
  transferOwnerships,
  lockOwnership
}
