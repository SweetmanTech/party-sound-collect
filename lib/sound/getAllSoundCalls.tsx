import { CHAIN_ID, SOUND_TRACKLIST, SOUND_INTERSTELLAR_TRACKLIST } from "../consts"
import getSoundInterstellarMintCall from "./getSoundInterstellarMintCall"
import getSoundMintCall from "./getSoundMintCall"

const getAllSoundCalls = async (recipient, signingAddress) => {
  const basePromises = SOUND_TRACKLIST.map((contractAddress: `0x${string}`) =>
    getSoundMintCall(recipient, CHAIN_ID, contractAddress),
  )

  const interstellarPromise = getSoundInterstellarMintCall(
    recipient,
    signingAddress,
    SOUND_INTERSTELLAR_TRACKLIST,
  )

  try {
    const allCalls = await Promise.all([...basePromises, interstellarPromise])
    const validCalls = allCalls.filter((call) => call)
    if (!validCalls.length) {
      return false
    }
    const totalValue = validCalls.reduce(
      (total, call: any) => total + BigInt(call.value),
      BigInt(0),
    )
    return {
      value: totalValue,
      calls: validCalls,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return false
  }
}

export default getAllSoundCalls
