import getProposalData from '@/lib/party/getProposalData';
import Button from '../Button';
import { useProvider } from '@/providers/Provider';
import getSoundMintCall from '@/lib/sound/getSoundMintCall';
import { base } from 'viem/chains';

const GenerateButton = () => {
  const { collectionAddress, saleStrategy, fundsRecipient, setProposalData, ethPrice, tokenId } =
    useProvider();

  const handleClick = async () => {
    const response = await getProposalData(collectionAddress, fundsRecipient);
    setProposalData(response);
  };

  return (
    <Button onClick={handleClick} className="bg-black px-12 py-4 rounded-3xl" di>
      Generate
    </Button>
  );
};

export default GenerateButton;
