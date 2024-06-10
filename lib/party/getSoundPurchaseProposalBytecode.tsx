import { Address } from 'viem';
import getProposalBytecode from './getProposalBytecode';
import getSoundMintCall from '../sound/getSoundMintCall';
import { base } from 'viem/chains';

const getSoundPurchaseProposalBytecode = async (collectionAddress: Address, recipient: Address) => {
  const soundCall = await getSoundMintCall(recipient, base.id, collectionAddress);
  if (!soundCall) return;
  const { value, callData, target } = soundCall;
  const encodedBytecodeProposalData = getProposalBytecode(target, value, callData);
  return encodedBytecodeProposalData;
};

export default getSoundPurchaseProposalBytecode;
