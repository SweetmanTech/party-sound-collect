import relayCallApi from "../relay/relayCallApi"

const getSoundBridgeTx = async ({ destinationChainId, originChainId, user, txs }: any) => {
  const response = await relayCallApi({ destinationChainId, originChainId, user, txs })
  const tx = response.steps[0].items[0].data
  const multicallTx = {
    target: tx.to,
    allowFailure: false,
    callData: tx.data,
    value: tx.value,
  }
  return multicallTx
}

export default getSoundBridgeTx
