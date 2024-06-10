import { encodeFunctionData } from 'viem';
import { getPublicClient } from '../clients';
import getViemNetwork from '../clients/getViemNetwork';

const getSoundMintCall = async (
  mintRecipient: `0x${string}`,
  chainId: number,
  collectionAddress: `0x${string}`,
) => {
  try {
    const publicClient = getPublicClient(chainId);
    const anyPublicClient = publicClient as any;

    const mintSchedules = await anyPublicClient.editionV2.mintSchedules({
      editionAddress: collectionAddress,
    });
    const { activeSchedules } = mintSchedules;
    const schedule = activeSchedules[activeSchedules.length > 1 ? 1 : 0];

    const mintParams = await anyPublicClient.editionV2.mintParameters({
      account: mintRecipient,
      chain: getViemNetwork(chainId),
      schedule,
      quantity: 1,
      editionAddress: collectionAddress,
      mintTo: mintRecipient,
    });

    const { args, functionName, address: SUPERMINTER, value, abi } = mintParams.mint.input;
    const soundMintDataV2 = encodeFunctionData({ abi, functionName, args });

    return {
      target: SUPERMINTER,
      value,
      allowFailure: false,
      callData: soundMintDataV2,
    };
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getSoundMintCall;
