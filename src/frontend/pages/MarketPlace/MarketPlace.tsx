/* eslint-disable no-await-in-loop */
import { ethers } from 'ethers';
import { loadMarketplaceItems } from 'frontend/redux/slices/marketplace';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

const MarketPlace = () => {
  const { lstMarketPlace, isLoading, marketplaceContract } = useSelector(
    (rootState: RootState) => rootState.marketplace
  );

  const buyMarketItem = async (item: { itemId: any; totalPrice: any }) => {
    if (!marketplaceContract) return null;
    await (await marketplaceContract.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
    dispatch(loadMarketplaceItems());
  };

  useEffect(() => {
    dispatch(loadMarketplaceItems());
  }, []);

  if (isLoading)
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <div className="flex justify-center">
      {lstMarketPlace.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {lstMarketPlace.map((item: any, idx: number) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid">
                      <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: '1rem 0' }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default MarketPlace;
