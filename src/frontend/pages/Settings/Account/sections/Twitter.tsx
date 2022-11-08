import { Button } from '@mui/material';
import Submenu from 'frontend/components/submenu';
import { FlexRow } from 'frontend/reusable/reusableStyled';

const Twitter = () => {
  return (
    <>
      <Submenu title="TWITTER" username="" routes={[]} noTag md={12} />
      <FlexRow w="100%" p="10px  0 10px 16px">
        <Button variant="outlined" sx={{ width: '100%' }}>
          Twitter
        </Button>
      </FlexRow>
    </>
  );
};

export default Twitter;
