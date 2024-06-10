import { CHAIN_ID, INTERSTELLAR_CHAIN_ID } from "../consts"
import getSoundBridgeTx from "./getSoundBridgeTx"
import getSoundMintCall from "./getSoundMintCall"

const getSoundInterstellarMintCall = async (
  recipient: `0x${string}`,
  signingAddress: `0x${string}`,
  editionAddresses: `0x${string}`[],
) => {
  const mintCallsPromises = editionAddresses.map((editionAddress) =>
    getSoundMintCall(recipient, INTERSTELLAR_CHAIN_ID, editionAddress),
  )

  const soundInterstellarMintCalls = await Promise.all(mintCallsPromises)

  const bridgeCalls = await getSoundBridgeTx({
    destinationChainId: INTERSTELLAR_CHAIN_ID,
    originChainId: CHAIN_ID,
    user: signingAddress,
    txs: soundInterstellarMintCalls.map((mintCall: any) => ({
      to: mintCall.target,
      data: mintCall.callData,
      value: mintCall.value.toString(),
    })),
  })

  return bridgeCalls
}

export default getSoundInterstellarMintCall
