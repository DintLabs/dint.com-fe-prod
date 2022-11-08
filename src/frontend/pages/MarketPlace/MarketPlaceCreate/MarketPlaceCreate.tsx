import { RootState, useSelector } from 'frontend/redux/store';
import { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from 'ethers';
import { Button, Form, Row } from 'react-bootstrap';
import { AddResult } from 'ipfs-core-types/src/root';

const client = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' });

const MarketPlaceCreate = () => {
  const { marketplaceContract, nftContract } = useSelector(
    (rootState: RootState) => rootState.marketplace
  );

  const [image, setImage] = useState('');
  const [price, setPrice] = useState<any>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const uploadToIPFS = async (event: any) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);

        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.error('ipfs image upload error: ', error);
      }
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(JSON.stringify({ image, price, name, description }));
      mintThenList(result);
    } catch (error) {
      console.error('ipfs uri upload error: ', error);
    }
  };

  const mintThenList = async (result: AddResult) => {
    if (!nftContract) return;
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    await (await nftContract.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nftContract.tokenCount();
    // approve marketplace to spend nft
    await (await nftContract.setApprovalForAll(marketplaceContract?.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    if (!marketplaceContract) return;
    await (await marketplaceContract.makeItem(nftContract.address, id, listingPrice)).wait();
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
            <div className="content mx-auto">
              <Row className="g-4">
                <Form.Control type="file" required name="file" onChange={uploadToIPFS} />
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  required
                  type="text"
                  placeholder="Name"
                />
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  required
                  as="textarea"
                  placeholder="Description"
                />
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  size="lg"
                  required
                  type="number"
                  placeholder="Price in ETH"
                />
                <div className="d-grid px-0">
                  <Button onClick={createNFT} variant="primary" size="lg">
                    Create & List NFT!
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default MarketPlaceCreate;
