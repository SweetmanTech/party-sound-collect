import getMaxExecutableTime from '@/lib/party/getMaxExecutableTime';
import { pad, toHex, concatHex, Address, zeroAddress } from 'viem';
import { ProposalType } from '@/lib/types/partyTypes';
import getZoraPurchaseProposalBytecode from './getZoraPurchaseProposalBytecode';
import getSoundPurchaseProposalBytecode from './getSoundPurchaseProposalBytecode';

const getProposalData = async (
  collectionAddress: Address = zeroAddress,
  recipient: Address = zeroAddress,
) => {
  const encodedBytecodeProposalData = await getSoundPurchaseProposalBytecode(
    collectionAddress,
    recipient,
  );
  console.log('SWEETS newData HELLO', encodedBytecodeProposalData);

  const hexEncodedSelector = pad(toHex(ProposalType.ArbitraryCalls), {
    size: 4,
  });
  const proposalData = concatHex([hexEncodedSelector, encodedBytecodeProposalData as Address]);
  const proposalStruct: any = {
    cancelDelay: '0',
    maxExecutableTime: getMaxExecutableTime(),
    proposalData,
  };

  return proposalStruct;
};

export default getProposalData;
