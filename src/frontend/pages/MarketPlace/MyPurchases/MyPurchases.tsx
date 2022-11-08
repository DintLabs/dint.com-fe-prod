import { ethers } from 'ethers';
import { loadPurchasedItems } from 'frontend/redux/slices/marketplace';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const MyPurchases = () => {
  const { lstPurchase, isPurchaseLoading } = useSelector(
    (rootState: RootState) => rootState.marketplace
  );

  useEffect(() => {
    dispatch(loadPurchasedItems());
  }, []);

  if (isPurchaseLoading)
    return (
      <main style={{ padding: '1rem 0' }}>
        <h2>Loading...</h2>
      </main>
    );
  return (
    <>
      <div className="flex justify-center">
        {lstPurchase.length > 0 ? (
          <div className="px-5 container">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
              {lstPurchase.map((item: any, idx) => (
                <Col key={idx} className="overflow-hidden">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Footer>{ethers.utils.formatEther(item.totalPrice)} ETH</Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <main style={{ padding: '1rem 0' }}>
            <h2>No purchases</h2>
          </main>
        )}
      </div>
    </>
  );
};
export default MyPurchases;
